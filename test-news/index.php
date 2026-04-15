<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("News");

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
ViteFrontendBridge::registerEntry('src/entrypoint/news/list.ts');
ViteFrontendBridge::registerEntry('src/entrypoint/catalog/list.ts');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>