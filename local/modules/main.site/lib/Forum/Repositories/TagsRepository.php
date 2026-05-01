<?php

namespace Main\Site\Forum\Repositories;

use Exception;

use Bitrix\Main\Entity\DataManager;
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
        if (empty($uids)) {
            return [];
        }

        $entityDataClass = $this->getEntityClass();
        $rsData = $entityDataClass::getList([
            'select' => ['ID', 'UF_CODE', 'UF_NAME'],
            'filter' => ['UF_XML_ID' => $uids],
        ]);

        /** @var Tag[] $tags */
        $tags = [];
        while ($arData = $rsData->fetch()) {
            $tags[] = new Tag(
                id: $arData['ID'],
                title: $arData['UF_NAME'],
                code: $arData['UF_CODE'],
            );
        }

        return $tags;
    }

    /**
     * @return Tag[]
     * @throws ArgumentException
     * @throws LoaderException
     * @throws ObjectPropertyException
     * @throws SystemException
     */
    public function getAll(): array
    {
        /** @var DataManager $entityDataClass */
        $entityDataClass = $this->getEntityClass();
        $rsData = $entityDataClass::getList([
            'select' => ['ID', 'UF_CODE', 'UF_NAME'],
        ]);

        /** @var Tag[] $tags */
        $tags = [];
        while ($arData = $rsData->fetch()) {
            $tags[] = new Tag(
                id: $arData['ID'],
                title: $arData['UF_NAME'],
                code: $arData['UF_CODE'],
            );
        }

        return $tags;
    }

    /**
     * @return string
     * @throws ArgumentException
     * @throws LoaderException
     * @throws ObjectPropertyException
     * @throws SystemException
     * @throws Exception
     */
    protected function getEntityClass(): string
    {
        if (!Loader::includeModule('highloadblock')) {
            throw new Exception('Модуль highloadblock не подключен');
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
        if (empty($entityDataClass)) {
            throw new Exception('Ошибка получения справочника ForumTags');
        }

        return $entityDataClass;
    }
}