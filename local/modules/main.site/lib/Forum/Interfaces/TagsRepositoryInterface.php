<?php

namespace Main\Site\Forum\Interfaces;

use Main\Site\Core\Models\Tag;

interface TagsRepositoryInterface
{
    /**
     * @param string[] $uids
     * @return Tag[]
     */
    public function getByUids(array $uids): array;
}