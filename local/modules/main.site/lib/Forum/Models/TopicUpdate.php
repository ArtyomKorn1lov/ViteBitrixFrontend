<?php

namespace Main\Site\Forum\Models;

use Bitrix\Main\Validation\Rule\NotEmpty;

final class TopicUpdate
{
    /**
     * @param int $id
     * @param string $name
     * @param int $sectionId
     * @param int[]|null $tagUIds
     * @param string|null $previewText
     * @param string|null $detailText
     * @param int[]|null $pictureIds
     */
    public function __construct(
        #[NotEmpty]
        public int $id,
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