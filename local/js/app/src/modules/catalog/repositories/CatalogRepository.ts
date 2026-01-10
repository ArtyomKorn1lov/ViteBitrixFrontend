import { ApiClient } from '@/core';
import { CatalogItem } from '@/modules/catalog/models';
import CatalogRepositoryInterface from '@/modules/catalog/repositories/CatalogRepositoryInterface';

export default class CatalogRepository implements CatalogRepositoryInterface {
  private apiClient: ApiClient;

  public constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  public async getRelated(): Promise<CatalogItem[] | null | undefined> {
    return this.apiClient.get<null, CatalogItem[]>('api/catalog/offers');
  }
}
