<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("News");

use Bitrix\Main\Web\Json;
use Site\ExtensionProvider;

?>

<?php
$arNewsData = [
    "templateId" => "news-list"
];
$arNewsData["templateId"] = ExtensionProvider::add($arNewsData["templateId"], "efs4464df");
$arNewsJSData = Json::encode($arNewsData);
?>
<script>
    BX.ready(function () {
        BX.Components.NewList(<?= $arNewsJSData ?>);
    });
</script>

<?php
$arCatalogData = [
    "templateId" => "catalog-list"
];
$arCatalogData["templateId"] = ExtensionProvider::add($arCatalogData["templateId"], "afdt5e435");
$arCatalogJSData = Json::encode($arCatalogData);
?>
<script>
    BX.ready(function () {
        BX.Components.CatalogList(<?= $arCatalogJSData ?>);
    });
</script>

<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>