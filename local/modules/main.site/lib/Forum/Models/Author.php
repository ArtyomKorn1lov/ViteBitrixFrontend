<?php

namespace Main\Site\Forum\Models;

use Main\Site\Core\Models\Picture;

final class Author
{
    /**
     * @param int $id
     * @param string $name
     * @param Picture|null $picture
     */
    public function __construct(
        public int $id,
        public string $name,
        public ?Picture $picture = null,
    )
    {
    }
}