import { injectable, inject } from 'inversify';
import { ResponseException, BaseUseCase, CommonResponse, ValidationProviderInterface, ValidationProviderServiceId } from '@/core';
import { FeedbackRepositoryInterface } from '@/modules/feedback/interfaces';
import { FeedbackRepositoryServiceId } from '@/modules/feedback/service-ids';
import { FeedbackModel } from '@/modules/feedback/models';

@injectable()
export default class SendFeedback extends BaseUseCase {
  public constructor(
    @inject(FeedbackRepositoryServiceId)
    private repository: FeedbackRepositoryInterface,
    @inject(ValidationProviderServiceId)
    private validationService: ValidationProviderInterface,
  ) {
    super();
  }

  public async execute(object: FeedbackModel): Promise<CommonResponse> {
    try {
      this.validationService.checkRequired(object.name, 'name');
      this.validationService.checkRequired(object.email, 'email');
      this.validationService.checkEmail(object.email, 'email');
      const response: CommonResponse | undefined | null = await this.repository.send(object);
      if (!response) {
        throw new ResponseException({
          message: 'An internal error occurred',
          status: 500,
        });
      }
      return response;
    } catch (exception) {
      console.error(exception);
      throw exception;
    }
  }
}
