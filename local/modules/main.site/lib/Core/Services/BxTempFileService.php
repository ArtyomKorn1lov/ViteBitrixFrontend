<?php

namespace Main\Site\Core\Services;

use CTempFile;
use CFile;
use Exception;

use Main\Site\Core\Interfaces\TempFileServiceInterface;
use Main\Site\Core\Models\FileInfo;

class BxTempFileService implements TempFileServiceInterface
{
    /**
     * @param int $fileSize
     * @param array|null $uploadTypes
     */
    public function __construct(
        protected int $fileSize = 1024 * 1024,
        protected ?array $uploadTypes = null,
    )
    {
    }

    /**
     * @param FileInfo $fileInfo
     * @return int
     * @throws Exception
     */
    public function upload(FileInfo $fileInfo): int
    {
        $tempPath = CTempFile::GetFileName(basename($fileInfo->name));
        CheckDirPath($tempPath);
        $inputStream = fopen('php://input', 'rb');
        $tempStream = fopen($tempPath, 'wb');
        if (!$inputStream && !$tempStream) {
            throw new Exception('Ошибка записи потока файла');
        }
        stream_copy_to_stream($inputStream, $tempStream);
        fclose($inputStream);
        fclose($tempStream);
        if (filesize($tempPath) === 0) {
            @unlink($tempPath);
            throw new Exception('Получен пустой файл');
        }
        $fileArray = CFile::MakeFileArray($tempPath);
        $fileArray['name'] = $fileInfo->name;
        $fileArray['type'] = $fileInfo->contentType;
        $fileArray['MODULE_ID'] = 'main.site';
        $this->validate($fileArray);
        $fileId = CFile::SaveFile($fileArray, 'main.site.uploads');
        if (!$fileId) {
            throw new Exception('Не удалось сохранить файл');
        }
        return $fileId;
    }

    /**
     * @param int $fileId
     * @return array
     * @throws Exception
     */
    public function get(int $fileId): array
    {
        $tmpFile = CFile::GetFileArray($fileId);
        if (empty($tmpFile)) {
            throw new Exception('Файл не найден');
        }
        return $tmpFile;
    }

    /**
     * @param array $fileArray
     * @return void
     * @throws Exception
     */
    protected function validate(array $fileArray): void
    {
        $fileExt = !empty($this->uploadTypes) ? implode(',', $this->uploadTypes) : false;
        $error = CFile::CheckFile(
            $fileArray,
            $this->fileSize,
            'image/',
            $fileExt,
        );
        if ($error !== '') {
            throw new Exception($error);
        }
    }
}