<?php
require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_before.php');

header('Content-Type: application/json; charset=utf-8');

Bitrix\Main\Loader::includeModule('main.site');

use Rest\Site\Core\Providers\ViteFrontendBridge;

$entrypoint = $_GET['entry'] ?? '';

ViteFrontendBridge::registerEntry($entrypoint);

echo json_encode(ViteFrontendBridge::createPaths());