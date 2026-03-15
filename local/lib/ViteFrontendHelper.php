<?php

namespace Site;

class ViteFrontendHelper
{
    /** @var string */
    protected const string ASSETS_PATH = 'dist';

    /** @var array */
    public static array $entries = [];

    /**
     * @param string $entry
     * @return void
     */
    public static function registerEntry(string $entry): void
    {
        if (empty($entry) || in_array($entry, static::$entries)) {
            return;
        }
        self::$entries[] = $entry;
    }

    /**
     * @return string
     */
    public static function createHtmlTags(): string
    {
        $result = [];
        foreach (self::$entries as $entry) {
            $tagList = [static::jsTag($entry)];
            $tagList = array_merge($tagList, static::jsPreloadImports($entry));
            $tagList = array_merge($tagList, static::cssTags($entry));
            $result = array_merge($result, $tagList);
        }
        $result = array_unique($result);
        return implode(' ', $result);
    }

    /**
     * @param string $entry
     * @return bool
     */
    protected static function isDevServer(string $entry): bool
    {
        static $exists = null;
        if ($exists !== null) {
            return $exists;
        }

        $viteHost = static::getViteWatchUrl();
        if (!$viteHost) {
            return false;
        }

        $handle = curl_init($viteHost . '/' . $entry);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_NOBODY, true);
        curl_exec($handle);
        $error = curl_errno($handle);
        curl_close($handle);
        return $error === 0;
    }

    /**
     * @return string|bool
     */
    protected static function getViteWatchUrl(): string|bool
    {
        static $watchUrl = null;
        if ($watchUrl !== null) {
            return $watchUrl;
        }
        $filePath = $_SERVER["DOCUMENT_ROOT"] . '/' . $_ENV['APP_FRONTEND_PATH'] . '/' . $_ENV['APP_HOTFILE_NAME'];
        $watchUrl = file_exists($filePath) ? file_get_contents($filePath) : false;
        return $watchUrl;
    }

    /**
     * @param string $entry
     * @return string
     */
    protected static function jsTag(string $entry): string
    {
        if (static::isDevServer($entry)) {
            $viteWatchUrl = static::getViteWatchUrl();
            $url = $viteWatchUrl . '/' . $entry;
            return '<script type="module" src="' . $viteWatchUrl . '/@vite/client"></script>' . '<script type="module" src="' . $url . '"></script>';
        }
        return '<script type="module" src="' . static::assetUrl($entry) . '"></script>';
    }

    /**
     * @param string $entry
     * @return array
     */
    protected static function jsPreloadImports(string $entry): array
    {
        if (static::isDevServer($entry)) {
            return [];
        }
        $res = [];
        $importsUrlList = static::importsUrls($entry);
        foreach ($importsUrlList as $url) {
            $res[] = '<link rel="modulepreload" href="' . $url . '">';
        }
        return $res;
    }

    /**
     * @param string $entry
     * @return array
     */
    protected static function cssTags(string $entry): array
    {
        if (static::isDevServer($entry)) {
            return [];
        }
        $tags = [];
        $cssUrlList = static::cssUrls($entry);
        foreach ($cssUrlList as $url) {
            $tags[] = '<link rel="stylesheet" href="' . $url . '">';
        }
        return $tags;
    }

    /**
     * @return array
     */
    protected static function getManifest(): array
    {
        static $arManifest = null;
        if ($arManifest !== null) {
            return $arManifest;
        }
        $manifestPath = $_SERVER["DOCUMENT_ROOT"] . '/' . $_ENV['APP_FRONTEND_PATH'] . '/dist/.vite/manifest.json';
        if (!file_exists($manifestPath)) {
            return [];
        }
        $content = file_get_contents($manifestPath);
        $arManifest = json_decode($content, true);
        return $arManifest;
    }

    /**
     * @param string $entry
     * @return string
     */
    protected static function assetUrl(string $entry): string
    {
        $manifest = static::getManifest();
        return isset($manifest[$entry])
            ? SITE_DIR . $_ENV['APP_FRONTEND_PATH'] . '/'. static::ASSETS_PATH .'/' . $manifest[$entry]['file']
            : '';
    }

    /**
     * @param string $entry
     * @return array
     */
    protected static function importsUrls(string $entry): array
    {
        $urls = [];
        $manifest = static::getManifest();
        if (empty($manifest[$entry]['imports'])) {
            return [];
        }
        foreach ($manifest[$entry]['imports'] as $imports) {
            $urls[] = SITE_DIR . $_ENV['APP_FRONTEND_PATH'] . '/' . static::ASSETS_PATH . '/' . $manifest[$imports]['file'];
        }
        return $urls;
    }

    /**
     * @param string $entry
     * @return array
     */
    protected static function cssUrls(string $entry): array
    {
        $urls = [];
        $manifest = static::getManifest();
        if (!empty($manifest[$entry]['css'])) {
            foreach ($manifest[$entry]['css'] as $file) {
                $nodeCssList = static::findRecursiveCss($entry);
                foreach ($nodeCssList as $nodeCssFile) {
                    $urls[] = SITE_DIR . $_ENV['APP_FRONTEND_PATH'] . '/' . static::ASSETS_PATH . '/' . $nodeCssFile;
                }
                $urls[] = SITE_DIR . $_ENV['APP_FRONTEND_PATH'] . '/' . static::ASSETS_PATH . '/' . $file;
            }
        }
        return $urls;
    }

    /**
     * @param string $entry
     * @return array
     */
    protected static function findRecursiveCss(string $entry): array
    {
        $manifest = static::getManifest();
        if (empty($manifest[$entry]['imports'])) {
            return [];
        }
        $nodeEntriesList = [];
        foreach ($manifest[$entry]['imports'] as $string) {
            $nodeEntriesList[] = $string;
        }
        $nodeCssList = [];
        foreach ($nodeEntriesList as $nodeEntry) {
            if (empty($manifest[$nodeEntry]['css'])) {
                continue;
            }
            $nodeCssList = array_merge($nodeCssList, $manifest[$nodeEntry]['css']);
        }
        return $nodeCssList;
    }
}