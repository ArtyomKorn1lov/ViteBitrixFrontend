interface TopicUpdate {
  id: number;
  name: string;
  sectionId: number;
  tagIds?: number[];
  previewText?: string;
  detailText?: string;
  pictureIds?: string[];
}

export default TopicUpdate;
