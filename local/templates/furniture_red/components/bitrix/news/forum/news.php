<?php
if (!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)
{
	die();
}
/** @var array $arParams */
/** @var array $arResult */
/** @global CMain $APPLICATION */
/** @global CUser $USER */
/** @global CDatabase $DB */
/** @var CBitrixComponentTemplate $this */
/** @var string $templateName */
/** @var string $templateFile */
/** @var string $templateFolder */
/** @var string $componentPath */
/** @var CBitrixComponent $component */
$this->setFrameMode(true);

use Bitrix\Main\Web\Json;
use Main\Site\Core\Providers\ViteFrontendBridge;

use Bitrix\Main\DI\ServiceLocator;
use Main\Site\Forum\Interfaces\TopicRepositoryInterface;

$arData = [
    'templateId' => 'forumMain' . $this->randString(),
];
$arJsData = Json::encode($arData);
?>
    <div id="<?=$arData['templateId']?>"></div>
    <script>
        BX.ready(function () {
            BX.Components.ForumMain(<?= $arJsData ?>);
        });
    </script>
<?php
ViteFrontendBridge::registerEntry('forum.main');
