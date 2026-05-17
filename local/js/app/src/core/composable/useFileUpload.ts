import { computed } from 'vue';
import { UploadRawFile, UploadRequestOptions } from 'element-plus';
import Localisation from '@/core/translations/Localisation';
import { DependencyContainer } from '@/core/dependency-injection';
import { SimpleObject } from '@/core/types';
import { FileUpload } from '@/core/models';
import { MimePictureTypes, ResponseStatus } from '@/core/enums';
import { FileRepositoryInterface } from '@/core/interfaces';
import { FileRepositoryServiceId } from '@/core/service-ids';
import { MessageHelper, FileHelper } from '@/core/utils';
import useFetch from '@/core/composable/useFetch';

const t = Localisation.global.t;

export default function useFileUpload(fileTypes: SimpleObject = MimePictureTypes) {
  const fileRepository: FileRepositoryInterface = DependencyContainer.get(FileRepositoryServiceId);

  const { fetch: fetchFile, isLoading } = useFetch<number>({
    callback: (file: FileUpload) => fileRepository.upload(file),
  });

  const acceptFiles = computed<string>(() => {
    const valuesArray: MimePictureTypes[] = Object.values(fileTypes);
    return valuesArray.join(', ');
  });

  const beforeFileUpload = (file: UploadRawFile): boolean => {
    if (!file) {
      MessageHelper.showNotification({
        message: t('core.file.error.fileErrorUploadMessage'),
      });
      return false;
    }
    const fileType: string = file.type;
    if (!Object.values(fileTypes).includes(fileType as MimePictureTypes)) {
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
      name: uploadFile.name,
      type: uploadFile.type ?? '',
      file: uploadFile,
      fileSize: FileHelper.formatSizeMB(uploadFile.size),
      url: FileHelper.createFileUrl(uploadFile),
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

  const removeFile = <T, K extends keyof T>(object: T, key: K, fileId: number): void => {
    // @ts-ignore
    object[key] = object[key]?.filter((item: FileUpload) => item.id !== fileId);
  };

  const removeAllFiles = <T, K extends keyof T>(object: T, key: K): void => {
    // @ts-ignore
    object[key] = [];
  };

  return {
    isLoading,
    acceptFiles,
    beforeFileUpload,
    sendRequest,
    handleFileUpload,
    removeFile,
    removeAllFiles,
  };
}
