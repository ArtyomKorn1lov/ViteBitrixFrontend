<?php
require($_SERVER['DOCUMENT_ROOT'] . '/bitrix/modules/main/include/prolog_before.php');

header('Content-Type: application/json; charset=utf-8');

use Site\ViteFrontendHelper;

$entrypoint = $_GET['entry'] ?? '';

ViteFrontendHelper::registerEntry($entrypoint);

echo json_encode(ViteFrontendHelper::createPaths());