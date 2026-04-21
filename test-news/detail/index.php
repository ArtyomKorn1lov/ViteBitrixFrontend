<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Новости детальная");

use Bitrix\Main\Web\Json;
use Rest\Site\Core\Providers\ViteFrontendBridge;

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
ViteFrontendBridge::registerEntry('news.detail');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
