<?php

use Bitrix\Main\Routing\RoutingConfigurator;

use Main\Site\Core\Controllers\ViteController;
use Main\Site\App\Controllers\MockController;
use Main\Site\Forum\Controllers\TopicController;
use Main\Site\Forum\Controllers\TagsController;

return function (RoutingConfigurator $routes) {
    $routes->prefix('api')->group(function (RoutingConfigurator $routes) {

        $routes->get('vite/loadAssets', [ViteController::class, 'loadAssetsAction']);

        $routes->get('catalog/offers', [MockController::class, 'getOffersAction']);

        $routes->get('news/', [MockController::class, 'getNewsAction']);

        $routes->post('feedback', [MockController::class, 'createFeedbackAction']);

        $routes->post('topic/groups', [TopicController::class, 'groupsAction']);

        $routes->get('topic/groups/all', [TopicController::class, 'groupsAllAction']);

        $routes->post('topic/items', [TopicController::class, 'itemsAction']);

        $routes->get('topic/{id}', [TopicController::class, 'detailAction']);

        $routes->get('tags/items', [TagsController::class, 'itemsAction']);

        $routes->post('topic/create', [TopicController::class, 'createAction']);

        $routes->put('topic/update', [TopicController::class, 'updateAction']);
    });
};
