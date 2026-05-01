import { injectable, inject } from 'inversify';
import { BaseUseCase, Tag } from '@/core';
import { TopicRepositoryInterface, TagsRepositoryInterface } from '@/modules/forum/interfaces';
import { TopicRepositoryServiceId, TagsRepositoryServiceId } from '@/modules/forum/service-ids';
import { TopicCreateData, ShortGroup } from '@/modules/forum/models';

@injectable()
export default class GetTopicCreateData extends BaseUseCase {
  public constructor(
    @inject(TopicRepositoryServiceId)
    private topicRepository: TopicRepositoryInterface,
    @inject(TagsRepositoryServiceId)
    private tagsRepository: TagsRepositoryInterface,
  ) {
    super();
  }

  public async execute(): Promise<TopicCreateData> {
    let groups: ShortGroup[] = [];
    let tags: Tag[] = [];
    try {
      groups = await this.topicRepository.getAllGroups();
      tags = await this.tagsRepository.getAll();
    } catch (error: Error | any) {
      console.error(error);
    }
    return {
      groups: groups,
      tags: tags,
    };
  }
}
