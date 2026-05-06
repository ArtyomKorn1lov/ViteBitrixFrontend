import { UploadRawFile, UploadRequestOptions } from 'element-plus';
import Localisation from '@/core/translations/Localisation';
import { DependencyContainer } from '@/core/dependency-injection';
import { FileUpload } from '@/core/models';
import { MimePictureTypes, ResponseStatus } from '@/core/enums';
import { FileRepositoryInterface } from '@/core/interfaces';
import { FileRepositoryServiceId } from '@/core/service-ids';
import { MessageHelper, FileHelper } from '@/core/utils';
import useFetch from '@/core/composable/useFetch';

const t = Localisation.global.t;

export default function useFileUpload() {
  const fileRepository: FileRepositoryInterface = DependencyContainer.get(FileRepositoryServiceId);

  const { fetch: fetchFile, isLoading } = useFetch<number>({
    callback: (file: FileUpload) => fileRepository.upload(file),
  });

  const beforeFileUpload = (file: UploadRawFile): boolean => {
    if (!file) {
      MessageHelper.showNotification({
        message: t('core.file.error.fileErrorUploadMessage'),
      });
      return false;
    }
    const fileType: string = file.type;
    if (!Object.values(MimePictureTypes).includes(fileType as MimePictureTypes)) {
      MessageHelper.showNotification({
        message: t('core.file.error.invalidFormatMessage'),
      });
      return false;
    }
    return true;
  };

  const sendRequest = async (options: UploadRequestOptions): Promise<FileUpload> => {
    const uploadFile: File = options.file;
    const requestFile: FileUpload = {
      id: 0,
      file: uploadFile,
      name: uploadFile.name,
      type: uploadFile.type ?? '',
      fileSize: FileHelper.formatSizeMB(uploadFile.size),
    };
    requestFile.id = await fetchFile(requestFile);
    return requestFile;
  };

  const handleFileUpload = <T, K extends keyof T>(object: T, key: K, uploadFile: FileUpload): void => {
    MessageHelper.showNotification({
      title: t('core.messages.successTitle'),
      message: t('core.file.success.message'),
      type: ResponseStatus.success,
    });
    // @ts-ignore
    object[key]?.push(uploadFile);
  };

  const removeFile = <T, K extends keyof T>(object: T, key: K, uploadFile: FileUpload): void => {
    // @ts-ignore
    object[key] = object[key]?.filter((item: FileUpload) => item.id !== uploadFile.id);
  };

  const removeAllFiles = <T, K extends keyof T>(object: T, key: K): void => {
    // @ts-ignore
    object[key] = [];
  };

  return {
    isLoading,
    beforeFileUpload,
    sendRequest,
    handleFileUpload,
    removeFile,
    removeAllFiles,
  };
}
