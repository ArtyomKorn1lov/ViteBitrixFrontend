<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Новости");

use Bitrix\Main\Web\Json;
use Rest\Site\Core\Providers\ViteFrontendBridge;

?>

<?php
$arNewsData = [
    "templateId" => "news-list" . "efs4464df"
];
$arNewsJSData = Json::encode($arNewsData);
?>
<div id="<?=$arNewsData['templateId']?>"></div>
<script>
    BX.ready(function () {
        BX.Components.NewList(<?= $arNewsJSData ?>);
    });
</script>

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
ViteFrontendBridge::registerEntry('news.list');
ViteFrontendBridge::registerEntry('catalog.list');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>