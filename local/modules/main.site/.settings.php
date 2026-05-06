<?php
if (!defined('B_PROLOG_INCLUDED') || B_PROLOG_INCLUDED !== true) die();

return [
    'controllers' => [
        'value' => [
            'defaultNamespace' => '\\Site\\RestControllers',
            'restIntegration' => [
                'enabled' => true,
                'scopes' => [],
            ],
        ],
        'readonly' => true,
    ],
    'services' => [
        'value' => [
            Main\Site\Core\Interfaces\TempFileServiceInterface::class => [
                'constructor' => static fn() => new Main\Site\Core\Services\BxTempFileService(fileSize: 1024 * 1024 * 10, uploadTypes: ['jpg', 'jpeg', 'png', 'gif', 'webp']),
            ],
            Main\Site\Forum\Interfaces\AuthorRepositoryInterface::class => ['className' => Main\Site\Forum\Repositories\AuthorRepository::class],
            Main\Site\Forum\Interfaces\TagsRepositoryInterface::class  => ['className' => Main\Site\Forum\Repositories\TagsRepository::class],
            Main\Site\Forum\Interfaces\TopicRepositoryInterface::class => ['className' => Main\Site\Forum\Repositories\TopicRepository::class],
        ],
    ]
];