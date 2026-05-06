<?php

namespace Main\Site\Core\Models;

final class FileInfo
{
    /**
     * @param string $name
     * @param string $contentType
     */
    public function __construct(
        public string $name,
        public string $contentType,
    )
    {
    }
}