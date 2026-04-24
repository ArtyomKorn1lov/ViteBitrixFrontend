import { Group, Topic } from '@/modules/forum/models';

interface TopicRepositoryInterface {
  getGroups: (page?: number) => Promise<Group[]>;
  getTopics: (groupId?: number, page?: number) => Promise<Topic[]>;
}

export default TopicRepositoryInterface;
