BX.namespace("BX.Globals");

/**
 * @param {{ isDev: string, path: string }} config
 */
function addGlobalViteConfig(config) {
    if (!BX) {
        return;
    }
    BX.Globals.ViteConfig = config;
}

BX.Globals.AsyncViteLoader = {
    /**
     * @param {string} entrypoint
     * @return {Promise<unknown>}
     */
    load: function (entrypoint) {
        return new Promise((resolve, reject) => {
            const config = BX.Globals.ViteConfig;
            if (!config || !entrypoint) {
                return reject();
            }
            if (config.isDev) {
                this.injectAssetInDev(`${config.path}/@vite/client`, true)
                    .then(() => {
                        return this.injectAssetInDev(`${config.path}/${entrypoint}`, true);
                    })
                    .then(resolve)
                    .catch(reject);
            } else {
                fetch(`/api/vite/loadAssets?entry=${entrypoint}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                    .then((response) => response.json())
                    .then(async (data) => {
                        await this.injectAssets(data);
                        resolve();
                    })
                    .catch(reject);
            }
        });
    },
    /**
     * @param {string} path
     * @param {boolean} isModule
     * @return {Promise<any>}
     */
    injectAssetInDev: function(path, isModule = false) {
        return new Promise((resolve, reject) => {
            if (document.querySelector(`script[src="${path}"]`)) {
                return resolve();
            }
            const script = document.createElement('script');
            if (isModule) script.type = 'module';
            script.src = path;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    },
    /**
     * @param {string[]} assetList
     */
    injectAssets: async function(assetList) {
        if (!assetList || assetList.length <= 0) {
            return;
        }
        assetList = assetList.filter((url) => !this.isAssetLoaded(url));
        const cssUrls = assetList.filter((url) => url.endsWith('.css'));
        const jsUrls = assetList.filter((url) => url.endsWith('.js'));
        await Promise.all(cssUrls.map((url) => this.injectCss(url)));
        for (const url of jsUrls) {
            await import(url);
        }
    },
    /**
     * @param {string} url
     * @return {boolean}
     */
    isAssetLoaded: function(url) {
        return !!document.querySelector(`[src*="${url}"], [href*="${url}"]`);
    },
    /**
     * @param url
     * @return {Promise<void>}
     */
    injectCss: async function (url) {
        return new Promise((resolve) => {
            if (document.querySelector(`link[href="${url}"]`)) return resolve();
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = url;
            link.onload = resolve;
            document.head.appendChild(link);
        });
    }
};