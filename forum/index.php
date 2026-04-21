<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Форум");
$APPLICATION->SetPageProperty("SHOW_SIDEBAR", false);

use Bitrix\Main\Web\Json;
use Rest\Site\Core\Providers\ViteFrontendBridge;

$arMainData = [
    'templateId' => 'forumMain',
];
$arMainJsData = Json::encode($arMainData);
?>
<div id="<?=$arMainData['templateId']?>"></div>
<script>
    BX.ready(function () {
        BX.Components.ForumMain(<?= $arMainJsData ?>);
    });
</script>
<?php
ViteFrontendBridge::registerEntry('forum.main');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");
?>
