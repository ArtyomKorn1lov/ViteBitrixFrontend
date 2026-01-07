<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("News Detail");

use Bitrix\Main\Web\Json;
use Site\ExtensionProvider;

?>

<?php
$arNewsData = [
    "templateId" => "news-detail"
];
$arNewsData["templateId"] = ExtensionProvider::add($arNewsData["templateId"], "fdgre435erg");
$arNewsJSData = Json::encode($arNewsData);
?>
<script>
    BX.ready(function () {
        BX.Components.NewsDetail(<?= $arNewsJSData ?>);
    });
</script>

<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
