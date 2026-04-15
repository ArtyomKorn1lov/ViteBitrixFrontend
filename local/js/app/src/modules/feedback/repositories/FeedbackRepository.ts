import { ApiClient, CommonResponse } from '@/core';
import { FeedbackModel } from '@/modules/feedback/models';
import FeedbackRepositoryInterface from '@/modules/feedback/repositories/FeedbackRepositoryInterface';

export default class FeedbackRepository implements FeedbackRepositoryInterface {
  private apiClient: ApiClient;

  public constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  public async send(object: FeedbackModel): Promise<CommonResponse | null | undefined> {
    return await this.apiClient.post<FeedbackModel, CommonResponse>('api/feedback', {
      data: object,
    });
  }
}
