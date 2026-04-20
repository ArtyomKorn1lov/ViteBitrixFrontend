<?
require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
$APPLICATION->SetTitle("Мебельная компания");
?>
<?php
use Bitrix\Main\Web\Json;

$arFormData = [
        "templateId" => "newsAsync"
];
$arCatalogFormData = [
        "templateId" => "catalogAsync"
];
$arFormJSData = Json::encode($arFormData);
$arCatalogFormJSData = Json::encode($arCatalogFormData);
?>
    <button
            id="news-async-load"
    >
        Mount news async
    </button>

    <div id="<?= $arFormData['templateId'] ?>"></div>

    <script>
        BX.ready(function () {
            const button = document.getElementById('news-async-load');

            button.addEventListener('click', function () {
                BX.Globals.AsyncViteLoader.load('news.list')
                    .then(function () {
                        button.remove();
                        BX.Components.NewList(<?= $arFormJSData ?>);
                    });
            });
        });
    </script>

    <button
            id="catalog-async-load"
    >
        Mount catalog async
    </button>

    <div id="<?= $arCatalogFormData['templateId'] ?>"></div>

    <script>
        BX.ready(function () {
            const button = document.getElementById('catalog-async-load');

            button.addEventListener('click', function () {
                BX.Globals.AsyncViteLoader.load('catalog.list')
                    .then(function () {
                        button.remove();
                        BX.Components.CatalogList(<?= $arCatalogFormJSData ?>);
                    });
            });
        });
    </script>
<p>
Наша компания существует на Российском рынке с 1992 года. За это время «Мебельная компания» прошла большой путь от маленькой торговой фирмы до одного из крупнейших производителей корпусной мебели в России.
</p><p>
«Мебельная компания» осуществляет производство мебели на высококлассном оборудовании с применением минимальной доли ручного труда, что позволяет обеспечить высокое качество нашей продукции. Налажен производственный процесс как массового и индивидуального характера, что с одной стороны позволяет обеспечить постоянную номенклатуру изделий и индивидуальный подход – с другой.
<h3>Наша продукция</h3>
<?$APPLICATION->IncludeComponent("bitrix:furniture.catalog.index", "", array(
	"IBLOCK_TYPE" => "products",
	"IBLOCK_ID" => "2",
	"IBLOCK_BINDING" => "section",
	"CACHE_TYPE" => "A",
	"CACHE_TIME" => "36000000",
	"CACHE_GROUPS" => "N"
	),
	false
);?>
<h3>Наши услуги</h3>
<?$APPLICATION->IncludeComponent("bitrix:furniture.catalog.index", "", array(
	"IBLOCK_TYPE" => "products",
	"IBLOCK_ID" => "3",
	"IBLOCK_BINDING" => "element",
	"CACHE_TYPE" => "A",
	"CACHE_TIME" => "36000000",
	"CACHE_GROUPS" => "N"
	),
	false
);?>
</p><?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>