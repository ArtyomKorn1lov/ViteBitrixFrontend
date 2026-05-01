interface FileUpload {
  id: number;
  file: File;
  name: string;
  fileSize: string;
  type: string;
  url?: string;
}

export default FileUpload;
