import { Picture, Tag } from '@/core';
import Author from '@/modules/forum/models/Author';
import ShortGroup from '@/modules/forum/models/ShortGroup';

interface TopicDetail {
  id: number;
  name: string;
  date: string | Date;
  author: Author;
  views: number;
  detailUrl: string;
  group?: ShortGroup;
  tags?: Tag[];
  previewText?: string;
  detailText?: string;
  pictures?: Picture[];
}

export default TopicDetail;
