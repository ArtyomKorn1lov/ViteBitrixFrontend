<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Каталог");

use Bitrix\Main\Web\Json;
use Rest\Site\Core\Providers\ViteFrontendBridge;

?>

<?php
$arCatalogData = [
    "templateId" => "catalog-list" . "afdt5e435"
];
$arCatalogJSData = Json::encode($arCatalogData);
?>
    <div id="<?=$arCatalogData['templateId']?>"></div>
    <script>
        BX.ready(function () {
            BX.Components.CatalogList(<?= $arCatalogJSData ?>);
        });
    </script>

<?php
    $arFormData = [
        "templateId" => "formFeedbackAsync"
    ];
    $arFormJSData = Json::encode($arFormData);
?>

    <button
        id="form-async-load"
    >
        Mount form async
    </button>

    <div id="<?= $arFormData['templateId'] ?>"></div>

    <script>
        BX.ready(function () {
            const button = document.getElementById('form-async-load');

            button.addEventListener('click', function () {
                BX.Globals.AsyncViteLoader.load('feedback.form')
                    .then(function () {
                        button.remove();
                        BX.Components.FeedbackForm(<?= $arFormJSData ?>);
                    });
            });
        });
    </script>

<?php
ViteFrontendBridge::registerEntry('catalog.list');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>