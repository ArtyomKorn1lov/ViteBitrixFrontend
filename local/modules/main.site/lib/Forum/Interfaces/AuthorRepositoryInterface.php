<?php

namespace Main\Site\Forum\Interfaces;

use Main\Site\Forum\Models\Author;

interface AuthorRepositoryInterface
{
    public function getById(int $id): Author;
}