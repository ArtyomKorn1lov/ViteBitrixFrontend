import { Group, Topic, TopicDetail } from '@/modules/forum/models';

interface TopicRepositoryInterface {
  getGroups: (page?: number) => Promise<Group[]>;
  getTopics: (groupId?: number, page?: number) => Promise<Topic[]>;
  getTopicById: (id: number) => Promise<TopicDetail>;
}

export default TopicRepositoryInterface;
