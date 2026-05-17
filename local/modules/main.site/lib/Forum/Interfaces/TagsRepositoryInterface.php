<?php

namespace Main\Site\Forum\Interfaces;

use Main\Site\Core\Models\Tag;

interface TagsRepositoryInterface
{
    /**
     * @param string[] $uids
     * @return Tag[]
     * @throws \Throwable
     */
    public function getByUids(array $uids): array;

    /**
     * @return Tag[]
     * @throws \Throwable
     */
    public function getAll(): array;
}