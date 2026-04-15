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
                    .then((data) => {
                        this.injectAssets(data);
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
    injectAssets: function(assetList) {
        if (!assetList || assetList.length <= 0) {
            return;
        }
        const missingAssets = assetList.filter((asset) => !this.isAssetLoaded(asset));
        missingAssets.forEach(async (asset) => {
            const fragment = document.createRange().createContextualFragment(asset);
            const element = fragment.firstChild;
            document.head.appendChild(element);
        });
    },
    isAssetLoaded: function(tagString) {
        const match = tagString.match(/(?:src|href)=["']([^"']+)["']/);
        if (!match) {
            if (tagString.includes('<script>')) {
                const content = tagString.replace(/<\/?script>/g, '').trim();
                return document.body.innerHTML.includes(content);
            }
            return false;
        }
        const path = match[1];
        const selector = `[src*="${path}"], [href*="${path}"]`;
        return document.querySelector(selector) !== null;
    },
};