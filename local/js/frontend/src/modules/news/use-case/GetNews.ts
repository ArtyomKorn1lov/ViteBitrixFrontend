import { BaseUseCase, ValidationProvider } from '@/core';
import { NewsRepositoryInterface } from '@/modules/news/repositories';
import { News } from '@/modules/news';

export default class GetNews extends BaseUseCase {
  private repository: NewsRepositoryInterface;
  private validationService: ValidationProvider;

  public constructor(repository: NewsRepositoryInterface, validationService: ValidationProvider) {
    super();
    this.repository = repository;
    this.validationService = validationService;
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
