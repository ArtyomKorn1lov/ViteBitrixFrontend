<?php

namespace Main\Site\Forum\Models;

use Main\Site\Core\Models\Picture;
use Main\Site\Core\Models\Tag;

final class TopicDetail
{
    /**
     * @param int $id
     * @param string $name
     * @param string $date
     * @param Author $author
     * @param int $views
     * @param string $detailUrl
     * @param Tag[]|null $tags
     * @param string|null $previewText
     * @param string|null $detailText
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
        public ?string $previewText = null,
        public ?string $detailText = null,
        public ?array $pictures = null,
    )
    {
    }
}