import { inject, injectable } from 'inversify';
import { BaseUseCase, ValidationProviderInterface, ValidationProviderServiceId } from '@/core';
import { NewsRepositoryInterface } from '@/modules/news/interfaces';
import { NewsRepositoryServiceId } from '@/modules/news/service-ids';
import { News } from '@/modules/news/models';

@injectable()
export default class GetNews extends BaseUseCase {
  public constructor(
    @inject(NewsRepositoryServiceId)
    private readonly repository: NewsRepositoryInterface,
    @inject(ValidationProviderServiceId)
    private readonly validationService: ValidationProviderInterface,
  ) {
    super();
  }

  public async execute(page: number): Promise<News[]> {
    try {
      this.validationService.checkRequired(page, 'page');
      const response = await this.repository.getList(page);
      return response ?? [];
    } catch (exception) {
      console.error(exception);
      throw exception;
    }
  }
}
