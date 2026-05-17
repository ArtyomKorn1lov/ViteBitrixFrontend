import { Tag } from '@/core';
import ShortGroup from '@/modules/forum/models/ShortGroup';

interface TopicCreateData {
  groups: ShortGroup[];
  tags: Tag[];
}

export default TopicCreateData;
