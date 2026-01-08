import { ApiClient } from '@/core';
import { News, NewsFilter } from '@/modules/news';
import NewsRepositoryInterface from '@/modules/news/repositories/NewsRepositoryInterface';

export default class NewsRepository implements NewsRepositoryInterface {
  private apiClient: ApiClient;

  public constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  public async getList(page: number): Promise<News[] | null | undefined> {
    const params: NewsFilter = {
      page: page,
    };
    return await this.apiClient.get<null, News[]>('api/news', {
      params: params,
    });
  }
}
