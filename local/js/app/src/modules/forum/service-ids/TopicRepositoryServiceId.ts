import { ServiceIdentifier } from 'inversify';
import { TopicRepositoryInterface } from '@/modules/forum/interfaces';

const TopicRepositoryServiceId: ServiceIdentifier<TopicRepositoryInterface> = Symbol.for('TopicRepositoryServiceId');

export default TopicRepositoryServiceId;
