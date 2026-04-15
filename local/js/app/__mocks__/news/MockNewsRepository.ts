import { News } from '@/modules/news/models';
import { NewsRepositoryInterface } from '@/modules/news/repositories';
import NewsDataMock from './news_data_mock.json';

export default class MockNewsRepository implements NewsRepositoryInterface {
  public async getList(page: number): Promise<News[] | null | undefined> {
    return await new Promise((resolve) => {
      setTimeout(() => {
        resolve(NewsDataMock[page]);
      }, 100);
    });
  }
}
