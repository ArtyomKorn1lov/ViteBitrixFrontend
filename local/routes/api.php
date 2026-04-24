<?php

use Bitrix\Main\Routing\RoutingConfigurator;

use Main\Site\Forum\Controllers\TopicController;

return function (RoutingConfigurator $routes) {
    $routes->prefix('api')->group(function (RoutingConfigurator $routes) {

        $routes->post('topic/groups', [TopicController::class, 'groupsAction']);

        $routes->post('topic/items', [TopicController::class, 'itemsAction']);
    });
};
