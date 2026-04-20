import { injectable, inject } from 'inversify';
import { ApiClientInterface, ApiClientServiceId } from '@/core';
import { News, NewsFilter } from '@/modules/news';
import { NewsRepositoryInterface } from '@/modules/news/interfaces';

@injectable()
export default class NewsRepository implements NewsRepositoryInterface {
  public constructor(
    @inject(ApiClientServiceId)
    private apiClient: ApiClientInterface,
  ) {}

  public async getList(page: number): Promise<News[] | null | undefined> {
    const params: NewsFilter = {
      page: page,
    };
    return await this.apiClient.get<null, News[]>('api/news', {
      params: params,
    });
  }
}
