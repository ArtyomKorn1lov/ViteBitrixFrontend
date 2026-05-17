import { inject, injectable } from 'inversify';
import { BaseUseCase } from '@/core';
import { CatalogRepositoryInterface } from '@/modules/catalog/interfaces';
import { CatalogRepositoryServiceId } from '@/modules/catalog/service-ids';
import { CatalogItem } from '@/modules/catalog/models';

@injectable()
export default class GetRelated extends BaseUseCase {
  public constructor(
    @inject(CatalogRepositoryServiceId)
    private readonly repository: CatalogRepositoryInterface,
  ) {
    super();
  }

  public async execute(): Promise<CatalogItem[]> {
    try {
      const response = await this.repository.getRelated();
      return response ?? [];
    } catch (exception) {
      console.error(exception);
      throw exception;
    }
  }
}
