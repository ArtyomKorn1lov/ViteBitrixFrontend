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

$elementId = (int)$arResult['VARIABLES']['ELEMENT_ID'];
if (empty($elementId)) {
    $elementCode = $arResult['VARIABLES']['ELEMENT_CODE'];
    if (empty($elementCode)) {
        LocalRedirect(SITE_DIR . 'forum');
    }
    $rsObject = CIBlockElement::GetList(
        arFilter: ['CODE' => $elementCode, 'ACTIVE' => 'Y'],
        arSelectFields: ['ID'],
    );
    $elementId = (int)$rsObject->fetch()['ID'];
}

use Bitrix\Main\Web\Json;
use Bitrix\Main\DI\ServiceLocator;
use Main\Site\Core\Providers\ViteFrontendBridge;
use Main\Site\Forum\Interfaces\TopicRepositoryInterface;

global $USER;

/** @var TopicRepositoryInterface $topicRepository */
$topicRepository = ServiceLocator::getInstance()->get(TopicRepositoryInterface::class);

$arData = [
    'templateId' => 'forumDetail' . $this->randString(),
    'id' => $elementId,
    'canEdit' => $USER->IsAuthorized() && !empty($topicRepository->findByUserId($USER->GetID(), $elementId)),
];
$arJsData = Json::encode($arData);
?>
    <div id="<?=$arData['templateId']?>"></div>
    <script>
        BX.ready(function () {
            BX.Components.ForumTopicDetail(<?= $arJsData ?>);
        });
    </script>
<?php
ViteFrontendBridge::registerEntry('forum.detail');
