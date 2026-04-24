<?php

namespace Main\Site\Core\Models;

final class Tag
{
    /**
     * @param string $title
     * @param string $code
     */
    public function __construct(
        public string $title,
        public string $code,
    )
    {
    }
}