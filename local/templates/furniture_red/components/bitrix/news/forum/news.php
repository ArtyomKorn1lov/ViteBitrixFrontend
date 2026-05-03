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

global $USER;

$arData = [
    'templateId' => 'forumMain' . $this->randString(),
];
$arJsData = Json::encode($arData);
?>
    <?php if ($USER->IsAuthorized()) {
        $arCreateData = [
            'templateId' => 'forumCreate' . $this->randString(),
        ];
        $arJsCreateData = Json::encode($arCreateData);
    ?>
        <button
            class="b-btn b-btn_medium b-btn_primary"
            style="margin-top: 15px;"
            id="forum-create-btn"
        >
            Создать тему
        </button>
        <div id="<?=$arCreateData['templateId']?>"></div>
        <script>
            BX.ready(function () {
                const button = document.getElementById('forum-create-btn');
                button.addEventListener('click', function () {
                    BX.Globals.AsyncViteLoader.load('forum.form')
                        .then(function () {
                            button.remove();
                            BX.Components.TopicForm(<?= $arJsCreateData ?>);
                        });
                });
            });
        </script>
    <?php } ?>
    <div></div>
    <div id="<?=$arData['templateId']?>"></div>
    <script>
        BX.ready(function () {
            BX.Components.ForumMain(<?= $arJsData ?>);
        });
    </script>
<?php
ViteFrontendBridge::registerEntry('forum.main');
