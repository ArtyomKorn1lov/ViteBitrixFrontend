<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Feedback");

use Bitrix\Main\Web\Json;
use Site\ExtensionProvider;

?>

<?php
$arData = [
    "templateId" => "feedback-form"
];
$arData["templateId"] = ExtensionProvider::add($arData["templateId"], "lfg546hg4335");
$arJSData = Json::encode($arData);
?>
<script>
    BX.ready(function () {
        BX.Components.FeedbackForm(<?= $arJSData ?>);
    });
</script>

<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
