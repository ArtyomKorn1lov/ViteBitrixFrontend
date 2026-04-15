<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("News");

use Bitrix\Main\Web\Json;
use Site\ViteFrontendHelper;

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
ViteFrontendHelper::registerEntry('src/entrypoint/news/list.ts');
ViteFrontendHelper::registerEntry('src/entrypoint/catalog/list.ts');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>