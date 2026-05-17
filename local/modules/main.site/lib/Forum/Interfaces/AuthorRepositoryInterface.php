<?php

namespace Main\Site\Forum\Interfaces;

use Main\Site\Forum\Models\Author;

interface AuthorRepositoryInterface
{
    /**
     * @param int $id
     * @return Author
     * @throws \Throwable
     */
    public function getById(int $id): Author;
}