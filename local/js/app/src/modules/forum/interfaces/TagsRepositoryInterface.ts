import { Tag } from '@/core';

interface TagsRepositoryInterface {
  getAll: () => Promise<Tag[]>;
}

export default TagsRepositoryInterface;
