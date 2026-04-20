import { News } from '@/modules/news/models';

interface NewsRepositoryInterface {
  getList: (page: number) => Promise<News[] | null | undefined>;
}

export default NewsRepositoryInterface;
