<?php

namespace Main\Site\Core\Controllers;

use Bitrix\Main\Error;
use Bitrix\Main\ErrorCollection;
use Bitrix\Main\Engine\Response\AjaxJson;
use Bitrix\Main\Engine\ActionFilter\Authentication;
use Bitrix\Main\Engine\ActionFilter\Csrf;
use Bitrix\Main\Engine\ActionFilter\HttpMethod;
use Bitrix\Main\Engine\Controller as BxController;
use Exception;

use Main\Site\Core\Providers\ViteFrontendBridge;

class ViteController extends BxController
{
    /**
     * @return array[]
     */
    public function configureActions(): array
    {
        return [
            'loadAssets' => [
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
     * @param string $entry
     * @return AjaxJson
     */
    public function loadAssetsAction(string $entry): AjaxJson
    {
        try {
            ViteFrontendBridge::registerEntry($entry);
            return AjaxJson::createSuccess(ViteFrontendBridge::createPaths());
        } catch (Exception $exception) {
            $errorCollection = new ErrorCollection();
            $errorCollection->setError(new Error($exception->getMessage()));
            return AjaxJson::createError($errorCollection);
        }
    }
}