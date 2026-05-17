interface TopicUpdate {
  id: number;
  name: string;
  sectionId: number;
  tagUIds?: string[];
  previewText?: string;
  detailText?: string;
  pictureIds?: number[];
}

export default TopicUpdate;
