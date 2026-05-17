<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
IncludeTemplateLangFile(__FILE__);
?>

<?php $APPLICATION->ShowViewContent("sidebar_end"); ?>

<?php
$showSidebar = $APPLICATION->GetPageProperty('SHOW_SIDEBAR', true);
if ($showSidebar) {
    ob_start();
?>
    <div id="sidebar">
        <? $APPLICATION->IncludeComponent("bitrix:menu", "left", array(
                "ROOT_MENU_TYPE" => "left",
                "MENU_CACHE_TYPE" => "A",
                "MENU_CACHE_TIME" => "36000000",
                "MENU_CACHE_USE_GROUPS" => "Y",
                "MENU_CACHE_GET_VARS" => array(),
                "MAX_LEVEL" => "1",
                "CHILD_MENU_TYPE" => "left",
                "USE_EXT" => "Y",
                "ALLOW_MULTI_SELECT" => "N"
        ),
                false,
                array(
                        "ACTIVE_COMPONENT" => "Y"
                )
        ); ?>
        <div class="content-block">
            <div class="content-block-inner">
                <h3><?= GetMessage('CFT_NEWS') ?></h3>
                <?
                $APPLICATION->IncludeFile(
                        SITE_DIR . "include/news.php",
                        array(),
                        array("MODE" => "html")
                );
                ?>
            </div>
        </div>

        <div class="content-block">
            <div class="content-block-inner">

                <?
                $APPLICATION->IncludeComponent("bitrix:search.form", "flat", array(
                        "PAGE" => "#SITE_DIR#search/",
                ),
                        false
                );
                ?>
            </div>
        </div>

        <div class="information-block">
            <div class="top"></div>
            <div class="information-block-inner">
                <h3><?= GetMessage('CFT_FEATURED') ?></h3>
                <?
                $APPLICATION->IncludeFile(
                        SITE_DIR . "include/random.php",
                        array(),
                        array("MODE" => "html")
                );
                ?>
            </div>
            <div class="bottom"></div>
        </div>
    </div>

    <div id="workarea">
<?php
    $APPLICATION->AddViewContent("sidebar_start", ob_get_clean());
}
?>

<?php
if ($showSidebar) {
    ob_start();
?>
    </div>
<?php
    $APPLICATION->AddViewContent("sidebar_end", ob_get_clean());
}
?>

		</div>
		<div id="space-for-footer"></div>
	</div>
	
	<div id="footer">
	
		<div id="copyright">
<?
$APPLICATION->IncludeFile(
	SITE_DIR."include/copyright.php",
	Array(),
	Array("MODE"=>"html")
);
?>
		</div>
		<div class="footer-links">	
<?
$APPLICATION->IncludeComponent("bitrix:menu", "bottom", array(
	"ROOT_MENU_TYPE" => "bottom",
	"MENU_CACHE_TYPE" => "N",
	"MENU_CACHE_TIME" => "36000000",
	"MENU_CACHE_USE_GROUPS" => "Y",
	"MENU_CACHE_GET_VARS" => array(
	),
	"MAX_LEVEL" => "1",
	"CHILD_MENU_TYPE" => "left",
	"USE_EXT" => "N",
	"ALLOW_MULTI_SELECT" => "N"
	),
	false
);
?>
		</div>
		<div id="footer-design"><?=GetMessage("FOOTER_DISIGN")?></div>
	</div>
</body>
</html>
<?php
ob_start();
$html = Main\Site\Core\Providers\ViteFrontendBridge::createHtmlTags();
echo $html;
$APPLICATION->AddViewContent("custom_dependencies", ob_get_clean());
?>
