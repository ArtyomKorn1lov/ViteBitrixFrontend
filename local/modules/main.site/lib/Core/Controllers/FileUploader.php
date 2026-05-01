<?php

namespace Main\Site\Core\Controllers;

use Bitrix\UI\FileUploader\CommitOptions;
use Bitrix\UI\FileUploader\Configuration;
use Bitrix\UI\FileUploader\FileOwnershipCollection;
use Bitrix\UI\FileUploader\UploaderController;

class FileUploader extends UploaderController
{
    /**
     * @return bool
     */
    public function isAvailable(): bool
    {
        return true;
    }

    /**
     * @return Configuration
     */
    public function getConfiguration(): Configuration
    {
        return new Configuration([
            'maxFileSize' => 20 * 1024 * 1024,
            'acceptedFileTypes' => [
                'image/jpg',
                'image/jpeg',
                'image/png',
                'image/gif',
                'image/webp',
            ],
            'ignoreUnknownImageTypes' => true,
        ]);
    }

    /**
     * @return bool
     */
    public function canUpload(): bool
    {
        return true;
    }

    /**
     * @return bool
     */
    public function canView(): bool
    {
        return true;
    }

    /**
     * @param FileOwnershipCollection $files
     * @return void
     */
    public function verifyFileOwner(FileOwnershipCollection $files): void {}

    /**
     * @return bool
     */
    public function canRemove(): bool
    {
        return true;
    }

    /**
     * @return CommitOptions
     */
    public function getCommitOptions(): CommitOptions
    {
        return new CommitOptions([
            'moduleId' => 'main.site',
            'savePath' => 'main.site.uploads',
            'forceRandom' => true,
            'skipExtension' => false,
        ]);
    }
}