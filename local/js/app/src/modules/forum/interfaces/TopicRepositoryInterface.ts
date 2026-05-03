import { CommonResponse } from '@/core';
import { Group, ShortGroup, Topic, TopicDetail, TopicCreate, TopicUpdate } from '@/modules/forum/models';

interface TopicRepositoryInterface {
  getGroups: (page?: number) => Promise<Group[]>;
  getAllGroups: () => Promise<ShortGroup[]>;
  getTopics: (groupId?: number, page?: number) => Promise<Topic[]>;
  getTopicById: (id: number) => Promise<TopicDetail>;
  create: (object: TopicCreate) => Promise<CommonResponse>;
  update: (object: TopicUpdate) => Promise<CommonResponse>;
}

export default TopicRepositoryInterface;
