<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("News Detail");

use Bitrix\Main\Web\Json;
use Site\ViteFrontendHelper;

?>

<?php
$arNewsData = [
    "templateId" => "news-detail" . "fdgre435erg"
];
$arNewsJSData = Json::encode($arNewsData);
?>
<div id="<?=$arNewsData['templateId']?>"></div>
<script>
    BX.ready(function () {
        BX.Components.NewsDetail(<?= $arNewsJSData ?>);
    });
</script>

<?php
ViteFrontendHelper::registerEntry('src/entrypoint/news/detail.ts');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
