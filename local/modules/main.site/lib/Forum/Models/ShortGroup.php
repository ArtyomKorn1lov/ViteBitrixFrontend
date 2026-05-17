<?php

namespace Main\Site\Forum\Models;

final class ShortGroup
{
    /**
     * @param int $id
     * @param string $title
     * @param string $code
     */
    public function __construct(
        public int $id,
        public string $title,
        public string $code,
    )
    {
    }
}