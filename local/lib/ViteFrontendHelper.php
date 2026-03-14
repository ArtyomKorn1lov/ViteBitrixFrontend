<?php

namespace Site;

class ViteFrontendHelper
{
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
        $htmlString = '';
        foreach (self::$entries as $entry) {
            $htmlString .= static::jsTag($entry) . static::jsPreloadImports($entry) . static::cssTag($entry);
        }
        return $htmlString;
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
        $filePath = $_SERVER["DOCUMENT_ROOT"] . '/' . $_ENV['APP_FRONTEND_PATH'] . '/vite.hot';
        return file_exists($filePath) ? file_get_contents($filePath) : false;
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
     * @return string
     */
    protected static function jsPreloadImports(string $entry): string
    {
        if (static::isDevServer($entry)) {
            return '';
        }
        $res = '';
        foreach (static::importsUrls($entry) as $url) {
            $res .= '<link rel="modulepreload" href="' . $url . '">';
        }
        return $res;
    }

    /**
     * @param string $entry
     * @return string
     */
    protected static function cssTag(string $entry): string
    {
        if (static::isDevServer($entry)) {
            return '';
        }
        $tags = '';
        foreach (static::cssUrls($entry) as $url) {
            $tags .= '<link rel="stylesheet" href="' . $url . '">';
        }
        return $tags;
    }

    /**
     * @return array
     */
    protected static function getManifest(): array
    {
        $manifestPath = $_SERVER["DOCUMENT_ROOT"] . '/' . $_ENV['APP_FRONTEND_PATH'] . '/dist/.vite/manifest.json';
        if (!file_exists($manifestPath)) {
            return [];
        }
        $content = file_get_contents($manifestPath);
        return json_decode($content, true);
    }

    /**
     * @param string $entry
     * @return string
     */
    protected static function assetUrl(string $entry): string
    {
        $manifest = static::getManifest();
        return isset($manifest[$entry])
            ? SITE_DIR . $_ENV['APP_FRONTEND_PATH'] . '/dist/' . $manifest[$entry]['file']
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
            $urls[] = SITE_DIR . $_ENV['APP_FRONTEND_PATH'] . '/dist/' . $manifest[$imports]['file'];
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
                $urls[] = SITE_DIR . $_ENV['APP_FRONTEND_PATH'] . '/dist/' . $file;
            }
        }
        return $urls;
    }
}