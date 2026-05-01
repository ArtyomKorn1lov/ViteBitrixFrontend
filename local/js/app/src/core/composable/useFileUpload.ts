import { UploadFile, UploadRawFile, UploadRequestOptions } from 'element-plus';
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

  const { fetch: fetchFile, isLoading } = useFetch({
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

  const sendRequest = async (options: UploadRequestOptions): Promise<string> => {
    const uploadFile: File = options.file;
    return await fetchFile({
      id: 0,
      file: uploadFile,
      name: uploadFile.name,
      type: uploadFile.type ?? '',
      fileSize: FileHelper.formatSizeMB(uploadFile.size),
    } as FileUpload);
  };

  const handleFileUpload = <T, K extends keyof T>(object: T, key: K, uploadFile: UploadFile) => {
    MessageHelper.showNotification({
      title: t('core.messages.successTitle'),
      message: t('core.file.success.message'),
      type: ResponseStatus.success,
    });
    const file: FileUpload = {
      id: uploadFile.uid,
      file: uploadFile.raw as File,
      name: uploadFile.name,
      type: uploadFile.raw?.type ?? '',
      fileSize: FileHelper.formatSizeMB(uploadFile.size ?? 0),
    };
    // @ts-ignore
    object[key]?.push(file);
  };

  return {
    isLoading,
    beforeFileUpload,
    sendRequest,
    handleFileUpload,
  };
}
