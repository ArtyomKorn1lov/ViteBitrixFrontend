import { inject, injectable } from 'inversify';
import { BaseUseCase } from '@/core';
import { TopicDetail, TopicForUpdate } from '@/modules/forum/models';
import { TopicRepositoryInterface } from '@/modules/forum/interfaces';
import { TopicRepositoryServiceId } from '@/modules/forum/service-ids';
import { TopicMapper } from '@/modules/forum/mappers';

@injectable()
export default class GetForUpdate extends BaseUseCase {
  constructor(
    @inject(TopicRepositoryServiceId)
    private topicRepository: TopicRepositoryInterface,
  ) {
    super();
  }

  public async execute(topicId: number): Promise<TopicForUpdate> {
    const response: TopicDetail = await this.topicRepository.getTopicById(topicId);
    return TopicMapper.fromDetailToForUpdate(response);
  }
}
