<?php

namespace Main\Site\Core\Models;

final class Picture
{
    /**
     * @param int $id
     * @param string $src
     */
    public function __construct(
        public int $id,
        public string $src,
    )
    {
    }
}