import Topic from '@/modules/forum/models/Topic';

interface Group {
  id: number;
  title: string;
  code: string;
  description?: string;
  topics?: Topic[];
}

export default Group;
