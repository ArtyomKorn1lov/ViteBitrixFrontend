<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Catalog");

use Bitrix\Main\Web\Json;
use Site\ViteFrontendHelper;

?>

<?php
$arCatalogData = [
    "templateId" => "catalog-list" . "afdt5e435"
];
$arCatalogJSData = Json::encode($arCatalogData);
?>
    <div id="<?=$arCatalogData['templateId']?>"></div>
    <script>
        BX.ready(function () {
            BX.Components.CatalogList(<?= $arCatalogJSData ?>);
        });
    </script>

<?php
ViteFrontendHelper::registerEntry('src/entrypoint/catalog/list.ts');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>