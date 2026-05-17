import { Picture, Tag } from '@/core';
import Author from '@/modules/forum/models/Author';

interface Topic {
  id: number;
  name: string;
  date: string | Date;
  author: Author;
  views: number;
  detailUrl: string;
  tags?: Tag[];
  description?: string;
  pictures?: Picture[];
}

export default Topic;
