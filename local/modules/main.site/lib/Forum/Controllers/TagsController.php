<?php

namespace Main\Site\Forum\Controllers;

use Exception;

use Bitrix\Main\Engine\Controller as BxController;
use Bitrix\Main\Engine\Response\AjaxJson;
use Bitrix\Main\DI\ServiceLocator;
use Bitrix\Main\ObjectNotFoundException;
use Bitrix\Main\Request;
use Bitrix\Main\Engine\ActionFilter\Csrf;
use Bitrix\Main\Engine\ActionFilter\HttpMethod;
use Bitrix\Main\Engine\ActionFilter\Authentication;
use Bitrix\Main\Error;
use Bitrix\Main\ErrorCollection;
use Bitrix\Main\Engine\JsonPayload;
use Psr\Container\NotFoundExceptionInterface;

use Main\Site\Forum\Interfaces\TagsRepositoryInterface;

class TagsController extends BxController
{
    private TagsRepositoryInterface $tagsRepository;

    /**
     * @param Request|null $request
     * @throws NotFoundExceptionInterface
     * @throws ObjectNotFoundException
     */
    public function __construct(?Request $request = null)
    {
        parent::__construct($request);
        $serviceLocator = ServiceLocator::getInstance();
        $this->tagsRepository = $serviceLocator->get(TagsRepositoryInterface::class);
    }

    public function configureActions(): array
    {
        return [
            'items' => [
                '-prefilters' => [
                    Csrf::class,
                    Authentication::class,
                ],
                '+prefilters' => [
                    new HttpMethod([HttpMethod::METHOD_GET]),
                ],
            ],
        ];
    }

    /**
     * @return AjaxJson
     */
    public function itemsAction(): AjaxJson
    {
        try {
            return AjaxJson::createSuccess($this->tagsRepository->getAll());
        } catch (Exception $exception) {
            $errorCollection = new ErrorCollection();
            $errorCollection->setError(new Error($exception->getMessage()));
            return AjaxJson::createError($errorCollection);
        }
    }
}