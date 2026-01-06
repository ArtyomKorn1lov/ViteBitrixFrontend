<?php

if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED !== true) {
    die();
}

$html = file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/local/js/frontend/dist/outputs/news/list.html");

$htmlList = explode("\n", $html);

$prefix = '/local/js/frontend/dist';
$pattern = '/(src|href)="\/([^"]+)"/i';
$replacement = '$1="' . $prefix . '/$2"';

foreach ($htmlList as &$item) {
    $item = preg_replace($pattern, $replacement, $item);
}

$html = implode("\n", $htmlList);

echo $html;