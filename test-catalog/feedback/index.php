<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Обратная связь");

use Bitrix\Main\Web\Json;
use Main\Site\Core\Providers\ViteFrontendBridge;

?>

<?php
$arData = [
    "templateId" => "feedback-form" . "lfg546hg4335"
];
$arJSData = Json::encode($arData);
?>
<div id="<?=$arData['templateId']?>"></div>
<script>
    BX.ready(function () {
        BX.Components.FeedbackForm(<?= $arJSData ?>);
    });
</script>

<?php
ViteFrontendBridge::registerEntry('feedback.form');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
