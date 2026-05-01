import { FileUpload } from '@/core/models';

interface FileRepositoryInterface {
  upload: (file: FileUpload) => Promise<string>;
}

export default FileRepositoryInterface;
