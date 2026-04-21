import { Picture } from '@/core';
import Tag from '@/modules/forum/models/Tag.ts';
import Author from '@/modules/forum/models/Author';

interface Topic {
  id: number;
  name: string;
  date: string | Date;
  author: Author;
  views: number;
  tags?: Tag[];
  description?: string;
  pictures?: Picture[];
}

export default Topic;
