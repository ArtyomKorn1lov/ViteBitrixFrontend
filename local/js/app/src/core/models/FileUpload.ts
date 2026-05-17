interface FileUpload {
  id: number;
  name: string;
  fileSize: string;
  type: string;
  file?: File;
  url?: string;
}

export default FileUpload;
