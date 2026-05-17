<?php
use Bitrix\Main\Application;
use Bitrix\Main\Entity\Query;
use Bitrix\Main\Loader;
use Bitrix\Main\Localization\Loc;
use Bitrix\Main\ModuleManager;
use Bitrix\Main\DB\SqlQueryException;
use Bitrix\Main\InvalidOperationException;
use Bitrix\Main\IO\Directory;
use Bitrix\Main\IO\File;
use Bitrix\Main\Config\Option;
use Bitrix\Main\Config\Configuration;
use Bitrix\Main\EventManager;
use Bitrix\Main\Context;
use Bitrix\Main\LoaderException;

Loc::loadMessages(__FILE__);

class main_site extends CModule
{
    public function __construct()
    {
        $arModuleVersion = array();
        include __DIR__ . '/version.php';
        if (is_array($arModuleVersion) && array_key_exists('VERSION', $arModuleVersion)) {
            $this->MODULE_VERSION = $arModuleVersion['VERSION'];
            $this->MODULE_VERSION_DATE = $arModuleVersion['VERSION_DATE'];
        }
        $this->MODULE_ID = 'main.site';
        $this->MODULE_NAME = 'Главный модуль сайта';
        $this->MODULE_DESCRIPTION = 'Главный модуль для тестового сайта';
        $this->MODULE_GROUP_RIGHTS = 'N';
        $this->PARTNER_NAME = '';
    }

    /**
     * @return void
     */
    public function doInstall(): void
    {
        global $APPLICATION;
        try {
            ModuleManager::registerModule($this->MODULE_ID);
        } catch (Exception $exception) {
            ModuleManager::unRegisterModule($this->MODULE_ID);
            $APPLICATION->ThrowException($exception->getMessage());
        }
    }

    /**
     * @return void
     */
    public function doUninstall(): void
    {
        global $APPLICATION;
        try {
            Option::delete($this->MODULE_ID);
            ModuleManager::unRegisterModule($this->MODULE_ID);
        } catch (Exception $exception) {
            ModuleManager::unRegisterModule($this->MODULE_ID);
            $APPLICATION->ThrowException($exception->getMessage());
        }
    }
}