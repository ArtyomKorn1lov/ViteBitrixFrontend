/**
 * @fileOverview
 * @description Unit-тесты для модуля `news`
 */

import { DependencyInjection } from '@/core';
import { GetNews } from '@/modules/news/use-case';
import { MockNewsRepository, NewsDataMock } from '../__mocks__/news';

/** @description Тесты для новостей */
describe('news', () => {
  DependencyInjection.register('NewsRepositoryInterface', MockNewsRepository);
  DependencyInjection.register('GetNews', GetNews, ['NewsRepositoryInterface', 'ValidationProvider']);

  const getNews: GetNews = DependencyInjection.resolve('GetNews');

  test('should getNews page 1', async () => {
    await expect(getNews.execute(1)).resolves.toEqual(NewsDataMock[1]);
  });

  test('should getNews page 2', async () => {
    await expect(getNews.execute(2)).resolves.toEqual(NewsDataMock[2]);
  });

  test('should getNews page 3', async () => {
    await expect(getNews.execute(3)).resolves.toEqual(NewsDataMock[3]);
  });
});
