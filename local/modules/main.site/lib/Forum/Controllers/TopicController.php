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

use Main\Site\Forum\Interfaces\TopicRepositoryInterface;

class TopicController extends BxController
{
    /** @var TopicRepositoryInterface */
    private TopicRepositoryInterface $topicRepository;

    /**
     * @param Request|null $request
     * @throws ObjectNotFoundException
     * @throws NotFoundExceptionInterface
     */
    public function __construct(?Request $request = null)
    {
        parent::__construct($request);
        $serviceLocator = ServiceLocator::getInstance();
        $this->topicRepository = $serviceLocator->get(TopicRepositoryInterface::class);
    }

    /**
     * @return array[]
     */
    public function configureActions(): array
    {
        return [
            'groups' => [
                '-prefilters' => [
                    Csrf::class,
                    Authentication::class,
                ],
                '+prefilters' => [
                    new HttpMethod([HttpMethod::METHOD_POST])
                ],
            ],
            'groupsAll' => [
                '-prefilters' => [
                    Csrf::class,
                    Authentication::class,
                ],
                '+prefilters' => [
                    new HttpMethod([HttpMethod::METHOD_GET])
                ],
            ],
            'items' => [
                '-prefilters' => [
                    Csrf::class,
                    Authentication::class,
                ],
                '+prefilters' => [
                    new HttpMethod([HttpMethod::METHOD_POST])
                ],
            ],
            'detail' => [
                '-prefilters' => [
                    Csrf::class,
                    Authentication::class,
                ],
                '+prefilters' => [
                    new HttpMethod([HttpMethod::METHOD_GET])
                ],
            ]
        ];
    }

    /**
     * @param JsonPayload $payload
     * @return AjaxJson
     * @throws \Throwable
     */
    public function groupsAction(JsonPayload $payload): AjaxJson
    {
        try {
            $data = $payload->getData();
            $page = (int)$data['page'] ?? null;
            return AjaxJson::createSuccess($this->topicRepository->getGroups($page));
        } catch (Exception $exception) {
            $errorCollection = new ErrorCollection();
            $errorCollection->setError(new Error($exception->getMessage()));
            return AjaxJson::createError($errorCollection);
        }
    }

    /**
     * @return AjaxJson
     * @throws \Throwable
     */
    public function groupsAllAction(): AjaxJson
    {
        try {
            return AjaxJson::createSuccess($this->topicRepository->getAllGroups());
        } catch (Exception $exception) {
            $errorCollection = new ErrorCollection();
            $errorCollection->setError(new Error($exception->getMessage()));
            return AjaxJson::createError($errorCollection);
        }
    }

    /**
     * @param JsonPayload $payload
     * @return AjaxJson
     * @throws \Throwable
     */
    public function itemsAction(JsonPayload $payload): AjaxJson
    {
        try {
            $data = $payload->getData();
            $page = (int)$data['page'] ?? null;
            $groupId = (int)$data['groupId'] ?? null;
            return AjaxJson::createSuccess($this->topicRepository->getItems($groupId, $page));
        } catch (Exception $exception) {
            $errorCollection = new ErrorCollection();
            $errorCollection->setError(new Error($exception->getMessage()));
            return AjaxJson::createError($errorCollection);
        }
    }

    /**
     * @param int $id
     * @return AjaxJson
     * @throws \Throwable
     */
    public function detailAction(int $id): AjaxJson
    {
        try {
            return AjaxJson::createSuccess($this->topicRepository->getById($id));
        } catch (Exception $exception) {
            $errorCollection = new ErrorCollection();
            $errorCollection->setError(new Error($exception->getMessage()));
            return AjaxJson::createError($errorCollection);
        }
    }
}