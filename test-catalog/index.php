<?php
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Catalog");

use Bitrix\Main\Web\Json;
use Site\ViteFrontendHelper;

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
                BX.Globals.AsyncViteLoader.load('src/entrypoint/feedback/form.ts')
                    .then(function () {
                        button.remove();
                        // TODO подумать как скрипт выполнить без timeout'а
                        setTimeout(() => {
                            BX.Components.FeedbackForm(<?= $arFormJSData ?>);
                        }, 100);
                    });
            });
        });
    </script>

<?php
ViteFrontendHelper::registerEntry('src/entrypoint/catalog/list.ts');
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>