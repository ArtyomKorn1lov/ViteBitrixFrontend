<?php

namespace Main\Site\Forum\Models;

final class Group
{
    /**
     * @param int $id
     * @param string $title
     * @param string $code
     * @param string|null $description
     * @param Topic[]|null $topics
     */
    public function __construct(
        public int $id,
        public string $title,
        public string $code,
        public ?string $description,
        public ?array $topics,
    )
    {
    }
}