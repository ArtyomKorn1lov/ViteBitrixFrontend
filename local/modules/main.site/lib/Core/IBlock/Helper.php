<?php

namespace Main\Site\Core\IBlock;

use Exception;

use Bitrix\Iblock\IblockTable;
use Bitrix\Main\Loader;
use Bitrix\Main\Localization\Loc;

Loc::loadMessages(__FILE__);

class Helper
{
    /**
     * @param string $code
     * @return int|bool
     */
    public static function getIBlock(string $code): int|bool
    {
        try {
            Loader::requireModule('iblock');
            if (empty($code)) {
                throw new Exception('Неверный идентификатор инфоблока');
            }
            $result = IblockTable::getRow(static::prepareRequestParams($code));
            if (empty($result)) {
                return false;
            }
            return $result["ID"];
        } catch (Exception $exception) {
            return false;
        }
    }

    /**
     * @param string $code
     * @return array
     */
    protected static function prepareRequestParams(string $code): array
    {
        return [
            "select" => ["ID"],
            "filter" => ["CODE" => $code],
            "cache" =>[
                'ttl' => 3600,
                'cache_joins' => true
            ]
        ];
    }
}