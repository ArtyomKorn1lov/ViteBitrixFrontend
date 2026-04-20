import { inject, injectable } from 'inversify';
import { ApiClientInterface, ApiClientServiceId } from '@/core';
import { CatalogItem } from '@/modules/catalog/models';
import { CatalogRepositoryInterface } from '@/modules/catalog/interfaces';

@injectable()
export default class CatalogRepository implements CatalogRepositoryInterface {
  public constructor(
    @inject(ApiClientServiceId)
    private readonly apiClient: ApiClientInterface,
  ) {}

  public async getRelated(): Promise<CatalogItem[] | null | undefined> {
    return this.apiClient.get<null, CatalogItem[]>('api/catalog/offers');
  }
}
