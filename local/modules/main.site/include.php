<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

if (
    is_file(__DIR__ . '/vendor/autoload.php')
    && !defined('COMPOSER_INITIALIZED')
) {
    require_once __DIR__ . '/vendor/autoload.php';
    @define('COMPOSER_INITIALIZED', true);
}

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$controllerNamespaces = [
    'Forum' => 'Topic'
];

foreach ($controllerNamespaces as $module => $entity) {
    $controller = '\\Main\\Site\\' . $module . '\\Controllers\\' . $entity . 'Controller';
    if (class_exists($controller)) {
        @class_alias($controller, '\\Site\\RestControllers\\' . $entity);
    }
}