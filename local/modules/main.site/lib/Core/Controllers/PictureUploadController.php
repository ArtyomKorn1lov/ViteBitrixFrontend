<?php

namespace Main\Site\Core\Controllers;

use Bitrix\Main\Error;
use Bitrix\Main\ErrorCollection;
use Bitrix\Main\Engine\Response\AjaxJson;
use Bitrix\Main\Engine\ActionFilter\Authentication;
use Bitrix\Main\Engine\ActionFilter\Csrf;
use Bitrix\Main\Engine\ActionFilter\HttpMethod;
use Bitrix\Main\Engine\Controller as BxController;
use Bitrix\Main\DI\ServiceLocator;
use Bitrix\Main\ObjectNotFoundException;
use Bitrix\Main\Request;
use Psr\Container\NotFoundExceptionInterface;
use Exception;

use Bitrix\Main\Type\RandomSequence;

use Main\Site\Core\Interfaces\TempFileServiceInterface;
use Main\Site\Core\Models\FileInfo;

class PictureUploadController extends BxController
{
    private TempFileServiceInterface $tempFileService;

    /**
     * @param Request|null $request
     * @throws ObjectNotFoundException
     * @throws NotFoundExceptionInterface
     */
    public function __construct(Request $request = null)
    {
        parent::__construct($request);
        $serviceLocator = ServiceLocator::getInstance();
        $this->tempFileService = $serviceLocator->get(TempFileServiceInterface::class);
    }

    /**
     * @return array[]
     */
    public function configureActions(): array
    {
        return [
            'upload' => [
                '-prefilters' => [
                    Csrf::class,
                    Authentication::class,
                ],
                '+prefilters' => [
                    new HttpMethod([HttpMethod::METHOD_POST])
                ],
            ]
        ];
    }

    /**
     * @return AjaxJson
     * @throws \Throwable
     */
    public function uploadAction(): AjaxJson
    {
        try {
            $request = $this->getRequest();
            $fileInfo = new FileInfo(
                name: (string)$request->getHeader('x-upload-content-name'),
                contentType: (string)$request->getHeader('content-type'),
            );
            $fileInfo->name = urldecode($fileInfo->name);
            if (empty($fileInfo->name)) {
                throw new Exception('У загруженного файла нет имени');
            }
            return AjaxJson::createSuccess($this->tempFileService->upload($fileInfo));
        } catch (Exception $exception) {
            $errorCollection = new ErrorCollection();
            $errorCollection->setError(new Error($exception->getMessage()));
            return AjaxJson::createError($errorCollection);
        }
    }
}