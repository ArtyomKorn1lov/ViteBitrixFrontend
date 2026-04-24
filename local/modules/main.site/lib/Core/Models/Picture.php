<?php

namespace Main\Site\Core\Models;

final class Picture
{
    /**
     * @param string $src
     */
    public function __construct(
        public string $src,
    )
    {
    }
}