import { resolve } from 'path';

export default {
  'catalog-list': resolve(__dirname, './src/entrypoint/catalog/list.ts'),
  'news-list': resolve(__dirname, './src/entrypoint/news/list.ts'),
  'news-detail': resolve(__dirname, './src/entrypoint/news/detail.ts'),
  'feedback-form': resolve(__dirname, './src/entrypoint/feedback/form.ts'),
};
