import { Picture } from '@/core';

interface TopicForUpdate {
  id: number;
  name: string;
  sectionId: number;
  tagUIds?: string[];
  previewText?: string;
  detailText?: string;
  pictures?: Picture[];
}

export default TopicForUpdate;
