<?php

namespace Main\Site\Core\Models;

final class Tag
{
    /**
     * @param int $id
     * @param string $title
     * @param string $code
     * @param string $uId
     */
    public function __construct(
        public int $id,
        public string $title,
        public string $code,
        public string $uId,
    )
    {
    }
}