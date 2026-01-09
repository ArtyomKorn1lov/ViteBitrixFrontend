<?php

namespace Site;

use Exception;

class ExtensionProvider
{
    /** @var string */
    protected const string PATH_PREFIX = "local/js/frontend/dist";
    /** @var string */
    protected const string FOLDER_PATH = self::PATH_PREFIX . "/outputs/";

    /**
     * @return string
     */
    protected static function getPathPrefix(): string
    {
        return SITE_DIR . static::PATH_PREFIX;
    }

    /**
     * @return string
     */
    protected static function getAbsolutePath(): string
    {
        return $_SERVER["DOCUMENT_ROOT"] . SITE_DIR . static::FOLDER_PATH;
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
            // TODO доработать функционал подключения скриптов и стилей из 'ui'
            $GLOBALS["customDependencies"] = [
                '<link rel="stylesheet" crossorigin href="/local/js/ui/dist/styles.bundle.css">',
            ];
        }

        $htmlList = explode("\n", file_get_contents(static::getAbsolutePath() . "/$namespace/$filename.html"));

        $prefix = static::getPathPrefix();
        $pattern = '/(src|href)="\/([^"]+)"/i';
        $replacement = '$1="' . $prefix . '/$2"';
        foreach ($htmlList as &$item) {
            $item = preg_replace($pattern, $replacement, $item);
        }

        $pattern = '/id="([^"]*)"/i';
        $replacement = 'id="$1-'.$hash.'"';
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