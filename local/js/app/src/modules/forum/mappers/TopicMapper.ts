import Localisation from '@/core/translations/Localisation';
import { Group, Topic, TopicDetail } from '@/modules/forum/models';

const t = Localisation.global.t;

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

export const mapTopicResponseToDetail = (response: TopicDetail | null | undefined): TopicDetail => {
  if (!response) {
    throw new Error(t('forum.topic.notFoundErrorMessage'));
  }
  return {
    ...response,
    date: new Date(response.date),
  };
};
