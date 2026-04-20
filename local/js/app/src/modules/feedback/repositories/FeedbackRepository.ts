import { inject, injectable } from 'inversify';
import { ApiClientInterface, ApiClientServiceId, CommonResponse } from '@/core';
import { FeedbackRepositoryInterface } from '@/modules/feedback/interfaces';
import { FeedbackModel } from '@/modules/feedback/models';

@injectable()
export default class FeedbackRepository implements FeedbackRepositoryInterface {
  public constructor(
    @inject(ApiClientServiceId)
    private readonly apiClient: ApiClientInterface,
  ) {}

  public async send(object: FeedbackModel): Promise<CommonResponse | null | undefined> {
    return await this.apiClient.post<FeedbackModel, CommonResponse>('api/feedback', {
      data: object,
    });
  }
}
