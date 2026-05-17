<?php

namespace Main\Site\Forum\Models;

use Bitrix\Main\Validation\Rule\NotEmpty;

final class TopicCreate
{
    /**
     * @param string $name
     * @param int $sectionId
     * @param string[]|null $tagUIds
     * @param string|null $previewText
     * @param string|null $detailText
     * @param int[]|null $pictureIds
     */
    public function __construct(
        #[NotEmpty]
        public string $name,
        #[NotEmpty]
        public int $sectionId,
        public ?array $tagUIds = null,
        public ?string $previewText = null,
        public ?string $detailText = null,
        public ?array $pictureIds = null,
    )
    {
    }
}