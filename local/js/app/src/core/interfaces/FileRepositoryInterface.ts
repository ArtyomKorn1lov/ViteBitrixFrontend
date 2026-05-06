import { FileUpload } from '@/core/models';

interface FileRepositoryInterface {
  upload: (file: FileUpload) => Promise<number>;
}

export default FileRepositoryInterface;
