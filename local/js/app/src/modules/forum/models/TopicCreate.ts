interface TopicCreate {
  name: string;
  sectionId: number;
  tagIds?: number[];
  previewText?: string;
  detailText?: string;
  pictureIds?: string[];
}

export default TopicCreate;
