import { inject, injectable } from 'inversify';
import { BaseUseCase, CommonResponse } from '@/core';
import { TopicRepositoryInterface, TopicValidationServiceInterface } from '@/modules/forum/interfaces';
import { TopicRepositoryServiceId, TopicValidationServiceId } from '@/modules/forum/service-ids';
import { TopicUpdate } from '@/modules/forum/models';
import { TOPIC_UPDATE_VALIDATION_RULES } from '@/modules/forum/constants';

@injectable()
export default class UpdateTopic extends BaseUseCase {
  public constructor(
    @inject(TopicValidationServiceId)
    private validationService: TopicValidationServiceInterface,
    @inject(TopicRepositoryServiceId)
    private topicRepository: TopicRepositoryInterface,
  ) {
    super();
  }

  public async execute(object: TopicUpdate): Promise<CommonResponse> {
    this.validationService.validate(object, TOPIC_UPDATE_VALIDATION_RULES);
    return await this.topicRepository.update(object);
  }
}
