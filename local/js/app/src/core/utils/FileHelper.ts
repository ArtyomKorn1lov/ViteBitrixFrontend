import Localisation from '@/core/translations/Localisation';
import { ArgumentException } from '@/core/exceptions';

const t = Localisation.global.t;

/**
 * @fileOverview
 * @description Хелпер для работы с файлами
 */

export const convertToBase64 = (file: Blob): Promise<string> => {
  if (!file) {
    throw new ArgumentException(t('core.utils.file.emptyFileErrorMessage'));
  }
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded: string = reader?.result?.toString().replace(/^data:(.*,)?/, '') ?? '';
      if (encoded.length % 4 > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const createFileUrl = (file: Blob): string => {
  if (!file) {
    throw new ArgumentException(t('core.utils.file.emptyFileErrorMessage'));
  }
  return URL.createObjectURL(file);
};

export const checkMaxFileSize = (file: Blob, maxFileSize: number) => {
  return file.size <= maxFileSize;
};
