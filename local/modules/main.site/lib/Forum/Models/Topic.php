<?php

namespace Main\Site\Forum\Models;

use DateTime;

use Main\Site\Core\Models\Tag;
use Main\Site\Core\Models\Picture;

final class Topic
{
    /**
     * @param int $id
     * @param string $name
     * @param string $date
     * @param Author $author
     * @param int $views
     * @param string $detailUrl
     * @param Tag[]|null $tags
     * @param string|null $description
     * @param Picture[]|null $pictures
     */
    public function __construct(
        public int $id,
        public string $name,
        public string $date,
        public Author $author,
        public int $views,
        public string $detailUrl,
        public ?array $tags = null,
        public ?string $description = null,
        public ?array $pictures = null,
    )
    {
    }
}