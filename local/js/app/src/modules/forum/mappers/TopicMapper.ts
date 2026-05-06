import Localisation from '@/core/translations/Localisation';
import { Group, ShortGroup, Topic, TopicDetail, TopicFormData, TopicCreate, TopicUpdate } from '@/modules/forum/models';

const t = Localisation.global.t;

export const fromGroupResponseToList = (response: Group[] | null | undefined): Group[] => {
  if (!response || response.length <= 0) {
    return [];
  }
  return response.map((group: Group) => {
    return {
      ...group,
      topics: fromResponseToList(group.topics),
    };
  });
};

export const fromShortGroupResponseToList = (response: ShortGroup[] | null | undefined) => {
  if (!response || response.length <= 0) {
    return [];
  }
  return [...response];
};

export const fromResponseToList = (response: Topic[] | null | undefined): Topic[] => {
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

export const fromResponseToDetail = (response: TopicDetail | null | undefined): TopicDetail => {
  if (!response) {
    throw new Error(t('forum.topic.notFoundErrorMessage'));
  }
  return {
    ...response,
    date: new Date(response.date),
  };
};

export const fromFormDataToCreate = (formData: TopicFormData): TopicCreate => {
  return {
    name: formData.name,
    sectionId: formData.sectionId as number,
    tagUIds: formData.tagUIds ?? [],
    pictureIds: formData.pictures && formData.pictures.length > 0 ? formData.pictures.map((picture) => picture.id) : [],
    previewText: formData.previewText ?? '',
    detailText: formData.detailText ?? '',
  };
};

export const fromFormDataToUpdate = (formData: TopicFormData, id: number): TopicUpdate => {
  return {
    id: id,
    name: formData.name,
    sectionId: formData.sectionId as number,
    tagUIds: formData.tagUIds ?? [],
    pictureIds: formData.pictures && formData.pictures.length > 0 ? formData.pictures.map((picture) => picture.id) : [],
    previewText: formData.previewText ?? '',
    detailText: formData.detailText ?? '',
  };
};
