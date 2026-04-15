import { ResponseException, BaseUseCase, CommonResponse, ValidationProvider } from '@/core';
import { FeedbackModel } from '@/modules/feedback/models';
import { FeedbackRepositoryInterface } from '@/modules/feedback/repositories';

export default class SendFeedback extends BaseUseCase {
  private repository: FeedbackRepositoryInterface;
  private validationService: ValidationProvider;

  constructor(repository: FeedbackRepositoryInterface, validationService: ValidationProvider) {
    super();
    this.repository = repository;
    this.validationService = validationService;
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
