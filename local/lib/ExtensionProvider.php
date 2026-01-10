<?php

namespace Site;

use Exception;

class ExtensionProvider
{
    /** @var string */
    protected const string APP_PATH_PREFIX = "dist";
    /** @var string */
    protected const string OUTPUTS_FOLDER_PATH = self::APP_PATH_PREFIX . "/outputs/";

    /**
     * @return string
     */
    protected static function getAppPathPrefix(): string
    {
        return SITE_DIR . $_ENV['APP_FRONTEND_PATH'] . static::APP_PATH_PREFIX;
    }

    /**
     * @return string
     */
    protected static function getAppAbsolutePath(): string
    {
        return $_SERVER["DOCUMENT_ROOT"] . SITE_DIR . $_ENV['APP_FRONTEND_PATH'] . static::OUTPUTS_FOLDER_PATH;
    }

    /**
     * @return array
     */
    protected static function getPluginDependencies(): array
    {
        $pluginPath = SITE_DIR . $_ENV['APP_PLUGINS_PATH'];
        return [
            '<link rel="stylesheet" crossorigin href="' . $pluginPath . 'dist/styles.bundle.css">',
            '<link rel="modulepreload" crossorigin href="' . $pluginPath . 'dist/vue.bundle.js">',
            '<link rel="modulepreload" crossorigin href="' . $pluginPath . 'dist/element-plus.bundle.js">',
            '<link rel="modulepreload" crossorigin href="' . $pluginPath . 'dist/axios.bundle.js">',
            '<link rel="modulepreload" crossorigin href="' . $pluginPath . 'dist/vue-i18n.bundle.js">',
            '<link rel="modulepreload" crossorigin href="' . $pluginPath . 'dist/pinia.bundle.js">',
            '<link rel="modulepreload" crossorigin href="' . $pluginPath . 'dist/vue-the-mask.bundle.js">',
        ];
    }

    /**
     * @param string $extensionName
     * @param string $hash
     * @return string
     * @throws Exception
     */
    public static function add(string $extensionName, string $hash = ""): string
    {
        if (empty($extensionName)) {
            throw new Exception("Имя расширения не может быть пустым");
        }
        [$namespace, $filename] = explode("-", $extensionName);
        if (empty($namespace) || empty($filename)) {
            throw new Exception("Формат указанного расширения некорректный");
        }

        if (empty($GLOBALS["customDependencies"])) {
            $GLOBALS["customDependencies"] = static::getPluginDependencies();
        }

        $htmlList = explode("\n", file_get_contents(static::getAppAbsolutePath() . "/$namespace/$filename.html"));

        $prefix = static::getAppPathPrefix();
        $pattern = '/(src|href)="\/([^"]+)"/i';
        $replacement = '$1="' . $prefix . '/$2"';
        foreach ($htmlList as &$item) {
            $item = preg_replace($pattern, $replacement, $item);
        }

        $pattern = '/id="([^"]*)"/i';
        $replacement = 'id="$1-' . $hash . '"';
        $dependencies = [];
        $mountedElement = "";
        foreach ($htmlList as $element) {
            if (preg_match("/<div\b/i", $element)) {
                $mountedElement = preg_replace($pattern, $replacement, $element);
                continue;
            }
            if (in_array($element, $GLOBALS["customDependencies"])) {
                continue;
            }
            $dependencies[] = $element;
        }

        $GLOBALS["customDependencies"] = [...$GLOBALS["customDependencies"], ...$dependencies];

        echo $mountedElement;

        return $extensionName . "-" . $hash;
    }

    /**
     * @return void
     */
    public static function showDependencies(): void
    {
        if (empty($GLOBALS["customDependencies"])) {
            return;
        }
        echo implode("\n", $GLOBALS["customDependencies"]);
    }
}