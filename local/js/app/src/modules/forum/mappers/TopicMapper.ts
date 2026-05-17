import Localisation from '@/core/translations/Localisation';
import { Tag, Picture, FileUpload } from '@/core';
import { Group, ShortGroup, Topic, TopicDetail, TopicFormData, TopicCreate, TopicForUpdate, TopicUpdate } from '@/modules/forum/models';

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

export const fromDetailToForUpdate = (response: TopicDetail): TopicForUpdate => {
  return {
    id: response.id,
    name: response.name,
    sectionId: response.group?.id ?? 0,
    tagUIds: response.tags?.map((item: Tag): string => item.uId),
    previewText: response.previewText,
    detailText: response.detailText,
    pictures: response.pictures,
  };
};

export const fromForUpdateToFormData = (object: TopicForUpdate): TopicFormData => {
  return {
    name: object.name,
    sectionId: object.sectionId,
    tagUIds: object.tagUIds,
    pictures: object.pictures?.map((item: Picture): FileUpload => {
      const path: string = item.src;
      const fileName: string = path.substring(path.lastIndexOf('/') + 1);
      const fileExt: string = fileName.substring(fileName.lastIndexOf('.') + 1);
      return {
        id: item.id,
        name: fileName,
        fileSize: '0',
        type: fileExt,
        url: path,
      };
    }),
    previewText: object.previewText,
    detailText: object.detailText,
  };
};

export const fromFormDataToCreate = (formData: TopicFormData): TopicCreate => {
  return {
    name: formData.name,
    sectionId: formData.sectionId as number,
    tagUIds: formData.tagUIds ?? [],
    pictureIds: formData.pictures && formData.pictures.length > 0 ? formData.pictures.map((picture: FileUpload) => picture.id) : [],
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
    pictureIds: formData.pictures && formData.pictures.length > 0 ? formData.pictures.map((picture: FileUpload) => picture.id) : [],
    previewText: formData.previewText ?? '',
    detailText: formData.detailText ?? '',
  };
};
