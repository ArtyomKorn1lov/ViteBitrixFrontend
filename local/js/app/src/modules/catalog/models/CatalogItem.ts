import { Picture } from '@/core';

interface CatalogItem {
  id: number;
  name: string;
  description?: string;
  picture?: Picture;
  tag?: string;
  date?: string;
}

export default CatalogItem;
