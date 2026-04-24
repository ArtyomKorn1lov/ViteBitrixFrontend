<?php

namespace Main\Site\Forum\Repositories;

use CUser;
use CFile;
use Exception;

use Main\Site\Core\Models\Picture;
use Main\Site\Forum\Interfaces\AuthorRepositoryInterface;
use Main\Site\Forum\Models\Author;

class AuthorRepository implements AuthorRepositoryInterface
{

    public function getById(int $id): Author
    {
        $rsObject = CUser::getList(
            arFilter: [
                'ID' => $id,
            ],
            arParams: [
                'SELECT' => [
                    'UF_PICTURE',
                ],
                'FIELDS' => [
                    'ID',
                    'NAME',
                    'LAST_NAME',
                    'SECOND_NAME',
                ],
            ]
        );
        $arUser = $rsObject->fetch();
        if (!$arUser) {
            throw new Exception('Пользователь форума не найден');
        }
        $picture = null;
        if (!empty($arUser['UF_PICTURE'])) {
            $picture = new Picture(
                src: CFile::GetPath($arUser['UF_PICTURE']) ?? '',
            );
        }
        return new Author(
            id: (int)$arUser['ID'],
            name: $arUser['NAME'],
            picture: $picture,
        );
    }
}