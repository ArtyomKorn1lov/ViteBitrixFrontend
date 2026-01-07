<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Catalog");

use Bitrix\Main\Web\Json;
use Site\ExtensionProvider;

?>

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