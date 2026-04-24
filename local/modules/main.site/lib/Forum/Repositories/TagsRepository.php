<?php

namespace Main\Site\Forum\Repositories;

use Exception;

use Bitrix\Main\ArgumentException;
use Bitrix\Main\LoaderException;
use Bitrix\Main\ObjectPropertyException;
use Bitrix\Main\SystemException;
use Bitrix\Highloadblock\HighloadBlockTable;
use Bitrix\Main\Loader;

use Main\Site\Core\Models\Tag;
use Main\Site\Forum\Interfaces\TagsRepositoryInterface;

class TagsRepository implements TagsRepositoryInterface
{

    /**
     * @param array $uids
     * @return array|Tag[]
     * @throws ArgumentException
     * @throws LoaderException
     * @throws ObjectPropertyException
     * @throws SystemException
     */
    public function getByUids(array $uids): array
    {
        if (!Loader::includeModule('highloadblock')) {
            throw new Exception('Модуль highloadblock не подключен');
        }

        if (empty($uids)) {
            return [];
        }

        $data = HighloadBlockTable::getList([
            'filter' => ['=NAME' => 'ForumTags'],
            'select' => ['ID']
        ])->fetch();

        $hlblockId = (int)$data['ID'];
        if (empty($hlblockId)) {
            throw new Exception('Справочник ForumTags не найден');
        }

        $hlblock = HighloadBlockTable::getById($hlblockId)->fetch();
        $entity = HighloadBlockTable::compileEntity($hlblock);
        $entityDataClass = $entity->getDataClass();
        $rsData = $entityDataClass::getList([
            'select' => ['UF_CODE', 'UF_NAME'],
            'filter' => ['UF_XML_ID' => $uids]
        ]);

        /** @var Tag[] $tags */
        $tags = [];
        while ($arData = $rsData->fetch()) {
            $tags[] = new Tag(
                title: $arData['UF_NAME'],
                code: $arData['UF_CODE'],
            );
        }

        return $tags;
    }
}