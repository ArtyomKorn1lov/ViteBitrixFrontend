<?php

namespace Main\Site\Core\Interfaces;

use Main\Site\Core\Models\FileInfo;

interface TempFileServiceInterface
{
    /**
     * @param FileInfo $fileInfo
     * @return int
     * @throws \Throwable
     */
    public function upload(FileInfo $fileInfo): int;

    /**
     * @param int $fileId
     * @return array
     * @throws \Throwable
     */
    public function get(int $fileId): array;
}