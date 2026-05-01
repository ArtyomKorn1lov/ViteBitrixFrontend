<?php

namespace Main\Site\Forum\Repositories;

use Bitrix\Main\LoaderException;
use Bitrix\Main\Type\DateTime;
use CIBlockElement;
use CIBlockSection;
use CFile;
use Exception;

use Bitrix\Main\DI\ServiceLocator;
use Bitrix\Main\ObjectNotFoundException;
use Bitrix\UI\FileUploader\FileInfo;
use Psr\Container\NotFoundExceptionInterface;
use Bitrix\Main\Loader;

use Main\Site\Core\IBlock\Helper;
use Main\Site\Core\Models\Picture;
use Main\Site\Forum\Interfaces\AuthorRepositoryInterface;
use Main\Site\Forum\Interfaces\TagsRepositoryInterface;
use Main\Site\Forum\Interfaces\TopicRepositoryInterface;
use Main\Site\Forum\Models\Group;
use Main\Site\Forum\Models\ShortGroup;
use Main\Site\Forum\Models\Topic;
use Main\Site\Forum\Models\TopicCreate;
use Main\Site\Forum\Models\TopicUpdate;
use Main\Site\Forum\Models\TopicDetail;

class TopicRepository implements TopicRepositoryInterface
{
    /** @var int */
    private const int GROUPS_PAGE_SIZE = 2;
    /** @var int */
    private const int ITEMS_PAGE_SIZE = 4;
    /** @var AuthorRepositoryInterface */
    private AuthorRepositoryInterface $authorRepository;
    /** @var TagsRepositoryInterface */
    private TagsRepositoryInterface $tagsRepository;

    /**
     * @throws ObjectNotFoundException
     * @throws NotFoundExceptionInterface
     */
    public function __construct()
    {
        $serviceLocator = ServiceLocator::getInstance();
        $this->authorRepository = $serviceLocator->get(AuthorRepositoryInterface::class);
        $this->tagsRepository = $serviceLocator->get(TagsRepositoryInterface::class);
    }

    /**
     * @param int $page
     * @return Group[]
     * @throws \Throwable
     */
    public function getGroups(int $page = 1): array
    {
        $this->includeModule();

        $rsObject = CIBlockSection::getList(
            arFilter: [
                'ACTIVE' => 'Y',
                'IBLOCK_ID' => Helper::getIBlock('topics'),
            ],
            arSelect: ['ID', 'CODE', 'NAME', 'DESCRIPTION'],
            arNavStartParams: [
                'nPageSize' => self::GROUPS_PAGE_SIZE,
                'iNumPage' => $page,
                'checkOutOfRange' => true,
            ],
        );
        /** @var Group[] $groups */
        $groups = [];
        while ($arSection = $rsObject->fetch()) {
            $sectionId = (int)$arSection['ID'];
            $topics = $this->getItems(groupId: $sectionId);
            $groups[] = new Group(
                id: $sectionId,
                title: $arSection['NAME'],
                code: $arSection['CODE'],
                description: $arSection['DESCRIPTION'],
                topics: $topics,
            );
        }

        return $groups;
    }

    /**
     * @return ShortGroup[]
     * @throws LoaderException
     */
    public function getAllGroups(): array
    {
        $this->includeModule();
        $rsObject = CIBlockSection::getList(
            arFilter: [
                'ACTIVE' => 'Y',
                'IBLOCK_ID' => Helper::getIBlock('topics'),
            ],
            arSelect: ['ID', 'CODE', 'NAME', 'DESCRIPTION'],
        );
        /** @var ShortGroup[] $groups */
        $groups = [];
        while ($arSection = $rsObject->fetch()) {
            $groups[] = new ShortGroup(
                id: (int)$arSection['ID'],
                title: $arSection['NAME'],
                code: $arSection['CODE'],
            );
        }
        return $groups;
    }

    /**
     * @param int $groupId
     * @param int $page
     * @return Topic[]
     * @throws \Throwable
     */
    public function getItems(int $groupId = 0, int $page = 1): array
    {
        $this->includeModule();

        $rsObject = CIBlockElement::GetList(
            arOrder: [
                'SORT' => 'ASC',
                'DATE_ACTIVE_FROM' => 'ASC',
            ],
            arFilter: [
                'ACTIVE' => 'Y',
                'IBLOCK_ID' => Helper::getIBlock('topics'),
                'SECTION_ID' => $groupId,
            ],
            arNavStartParams: [
                'nPageSize' => self::ITEMS_PAGE_SIZE,
                'iNumPage' => $page,
                'checkOutOfRange' => true,
            ],
            arSelectFields: ['ID', 'NAME', 'DATE_ACTIVE_FROM', 'SHOW_COUNTER', 'DETAIL_PAGE_URL', 'PREVIEW_TEXT'],
        );

        /** @var Topic[] $topics */
        $topics = [];
        while ($obElement = $rsObject->GetNextElement()) {
            $fields = $obElement->getFields();
            $author = $this->authorRepository->getById((int)$obElement->getProperty('AUTHOR')['VALUE']);
            $pictures = $this->getPictures($obElement->getProperty('PICTURES')['VALUE']);
            $tagsUids = $obElement->getProperty('TAGS')['VALUE'];
            if ($tagsUids === false) {
                $tagsUids = [];
            }
            $tags = $this->tagsRepository->getByUids(array_unique($tagsUids));
            $topics[] = new Topic(
                id: (int)$fields['ID'],
                name: $fields['NAME'],
                date: $fields['ACTIVE_FROM_X'],
                author: $author,
                views: (int)$fields['SHOW_COUNTER'],
                detailUrl: $fields['DETAIL_PAGE_URL'],
                tags: $tags,
                description: $fields['PREVIEW_TEXT'] ?? '',
                pictures: $pictures,
            );
        }

        return $topics;
    }

    /**
     * @param int $topicId
     * @return TopicDetail
     * @throws LoaderException
     * @throws Exception
     */
    public function getById(int $topicId): TopicDetail
    {
        $this->includeModule();

        $rsObject = CIBlockElement::GetList(
            arOrder: [
                'SORT' => 'ASC',
                'DATE_ACTIVE_FROM' => 'ASC',
            ],
            arFilter: [
                'ACTIVE' => 'Y',
                'IBLOCK_ID' => Helper::getIBlock('topics'),
                'ID' => $topicId,
            ],
            arSelectFields: ['ID', 'NAME', 'DATE_ACTIVE_FROM', 'SHOW_COUNTER', 'DETAIL_PAGE_URL', 'PREVIEW_TEXT', 'DETAIL_TEXT'],
        );

        $obElement = $rsObject->GetNextElement();
        if (empty($obElement)) {
            throw new Exception('Тема для обсуждения не найдена');
        }
        $fields = $obElement->getFields();
        $author = $this->authorRepository->getById((int)$obElement->getProperty('AUTHOR')['VALUE']);
        $pictures = $this->getPictures($obElement->getProperty('PICTURES')['VALUE']);
        $tagsUids = $obElement->getProperty('TAGS')['VALUE'];
        if ($tagsUids === false) {
            $tagsUids = [];
        }
        $tags = $this->tagsRepository->getByUids(array_unique($tagsUids));

        return new TopicDetail(
            id: (int)$fields['ID'],
            name: $fields['NAME'],
            date: $fields['ACTIVE_FROM_X'],
            author: $author,
            views: (int)$fields['SHOW_COUNTER'],
            detailUrl: $fields['DETAIL_PAGE_URL'],
            tags: $tags,
            previewText: $fields['PREVIEW_TEXT'] ?? '',
            detailText: $fields['DETAIL_TEXT'] ?? '',
            pictures: $pictures,
        );
    }

    /**
     * @param TopicCreate $topic
     * @return int
     * @throws LoaderException
     */
    public function create(TopicCreate $topic): int
    {
        $this->includeModule();
        global $USER;
        $pictures = $this->getUploadedPictures($topic->pictureIds);
        $entity = new CIBlockElement();
        $itemId = $entity->Add([
            'IBLOCK_ID' => Helper::getIBlock('topics'),
            'IBLOCK_TYPE' => 'forum',
            'ACTIVE' => 'N',
            'NAME' => $topic->name,
            'IBLOCK_SECTION_ID' => $topic->sectionId,
            'DATE_ACTIVE_FROM' => new DateTime()->format('d.m.Y'),
            'PREVIEW_TEXT' => $topic->previewText ?? '',
            'DETAIL_TEXT' => $topic->detailText ?? '',
            'PROPERTY_VALUES' => [
                'AUTHOR' => $USER->getId(),
                'TAGS' => $topic->tags ?? [],
                'PICTURES' => $pictures,
            ]
        ]);
        if (!$itemId) {
            throw new Exception($entity->LAST_ERROR);
        }
        return $itemId;
    }

    /**
     * @param TopicUpdate $topicUpdate
     * @return int
     * @throws LoaderException
     */
    public function update(TopicUpdate $topicUpdate): int
    {
        $this->includeModule();
        global $USER;
        $pictures = $this->getUploadedPictures($topicUpdate->pictureIds);
        $entity = new CIBlockElement();
        $itemId = $entity->update($topicUpdate->id, [
            'ACTIVE' => 'N',
            'NAME' => $topicUpdate->name,
            'IBLOCK_SECTION_ID' => $topicUpdate->sectionId,
            'PREVIEW_TEXT' => $topic->previewText ?? '',
            'DETAIL_TEXT' => $topic->detailText ?? '',
            'PROPERTY_VALUES' => [
                'AUTHOR' => $USER->getId(),
                'TAGS' => $topic->tags ?? [],
                'PICTURES' => $pictures,
            ]
        ]);
        if (!$itemId) {
            throw new Exception($entity->LAST_ERROR);
        }
        return $itemId;
    }

    /**
     * @return void
     * @throws LoaderException
     */
    protected function includeModule(): void
    {
        if (!Loader::includeModule('iblock')) {
            throw new Exception('Модуль iblock не подключен');
        }
    }

    /**
     * @param string[]|int[]|bool $pictureIds
     * @return Picture[]
     */
    protected function getPictures(array|bool $pictureIds): array
    {
        if (empty($pictureIds)) {
            return [];
        }
        /** @var Picture[] $pictures */
        $pictures = [];
        foreach ($pictureIds as $pictureId) {
            $pictures[] = new Picture(
                src: CFile::getPath((int)$pictureId),
            );
        }
        return $pictures;
    }

    /**
     * @param array|bool $pictureIds
     * @return array
     */
    private function getUploadedPictures(array|bool $pictureIds): array
    {
        if (empty($pictureIds)) {
            return [];
        }
        $pictures = [];

        foreach ($pictureIds as $pictureId) {
            $tmpFile = FileInfo::createFromTempFile($pictureId);
            if (empty($tmpFile)) {
                continue;
            }
            $pictures[] = [
                'VALUE' => $tmpFile->getFileId(),
            ];
        }

        return $pictures;
    }
}