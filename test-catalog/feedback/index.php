<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Feedback");

use Bitrix\Main\Web\Json;
use Site\ViteFrontendHelper;

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
ViteFrontendHelper::registerEntry('src/entrypoint/feedback/form.ts');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>
