import { Picture, Tag } from '@/core';
import Author from '@/modules/forum/models/Author';

interface TopicDetail {
  id: number;
  name: string;
  date: string | Date;
  author: Author;
  views: number;
  detailUrl: string;
  tags?: Tag[];
  previewText?: string;
  detailText?: string;
  pictures?: Picture[];
}

export default TopicDetail;
