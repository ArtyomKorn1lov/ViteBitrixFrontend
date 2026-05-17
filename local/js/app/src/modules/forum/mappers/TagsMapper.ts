import { Tag } from '@/core';

export const fromResponseToList = (response: Tag[] | null | undefined): Tag[] => {
  if (!response || response.length <= 0) {
    return [];
  }
  return response.map((item: Tag) => item);
};
