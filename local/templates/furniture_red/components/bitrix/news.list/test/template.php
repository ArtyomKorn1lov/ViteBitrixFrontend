<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);

use Bitrix\Main\Web\Json;

$arData = [
    "templateId" => "news-list"
];
$arJSData = Json::encode($arData);
?>
<script>
    BX.ready(function () {
        BX.Citrus.Components.NewList(<?= $arJSData ?>);
    });
</script>