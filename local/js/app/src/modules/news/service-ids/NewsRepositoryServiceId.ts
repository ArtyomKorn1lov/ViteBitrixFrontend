import { ServiceIdentifier } from 'inversify';
import { NewsRepositoryInterface } from '@/modules/news/interfaces';

const NewsRepositoryServiceId: ServiceIdentifier<NewsRepositoryInterface> = Symbol.for('NewsRepositoryServiceId');

export default NewsRepositoryServiceId;
