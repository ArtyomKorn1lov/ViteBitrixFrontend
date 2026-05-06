import { SimpleObject } from '@/core/types';
import { FileUpload } from '@/core/models';

export const buildAddsHeading = (file: FileUpload): SimpleObject => {
  return {
    'Content-Type': file.type,
    'x-upload-content-name': file.name,
  };
};
