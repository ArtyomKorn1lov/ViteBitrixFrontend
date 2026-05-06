import FileUpload from '@/core/models/FileUpload.ts';

interface TopicFormData {
  name: string;
  sectionId?: number;
  tagUIds?: string[];
  previewText?: string;
  detailText?: string;
  pictures?: FileUpload[];
}

export default TopicFormData;
