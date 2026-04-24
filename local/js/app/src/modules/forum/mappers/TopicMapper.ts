import { Group, Topic } from '@/modules/forum/models';

export const mapTopicGroupResponseToList = (response: Group[] | null | undefined): Group[] => {
  if (!response || response.length <= 0) {
    return [];
  }
  return response.map((group: Group) => {
    return {
      ...group,
      topics: mapTopicResponseToList(group.topics),
    };
  });
};

export const mapTopicResponseToList = (response: Topic[] | null | undefined): Topic[] => {
  if (!response || response.length <= 0) {
    return [];
  }
  return response.map((item: Topic) => {
    return {
      ...item,
      date: new Date(item.date),
    };
  });
};
