import Translations from '@/translations';
import { ArgumentException } from '@/core/exceptions/index.ts';

const t = Translations.global.t;

/**
 * @fileOverview
 * @description Хелпер для работы с файлами
 */

export const convertToBase64 = (file: any) => {
  if (!file) {
    throw new ArgumentException(t('core.utils.file.emptyFileErrorMessage'));
  }
  return new Promise((resolve, reject) => {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader?.result?.toString().replace(/^data:(.*,)?/, '') ?? '';
      if (encoded.length % 4 > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const createFileUrl = (file: any) => {
  if (!file) {
    throw new ArgumentException(t('core.utils.file.emptyFileErrorMessage'));
  }
  return URL.createObjectURL(file);
};

export const checkMaxFileSize = (file: any, maxFileSize: any) => {
  return file.size <= maxFileSize;
};
