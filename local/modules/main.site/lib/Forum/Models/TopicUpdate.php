<?php

namespace Main\Site\Forum\Models;

final class TopicUpdate
{
    /**
     * @param int $id
     * @param string $name
     * @param int $sectionId
     * @param array|null $tagIds
     * @param string|null $previewText
     * @param string|null $detailText
     * @param string|null $pictureIds
     */
    public function __construct(
        public int $id,
        public string $name,
        public int $sectionId,
        public ?array $tagIds = null,
        public ?string $previewText = null,
        public ?string $detailText = null,
        public ?string $pictureIds = null,
    )
    {
    }
}