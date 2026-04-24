import { DependencyContainer } from '@/core';
import { TopicRepositoryServiceId } from '@/modules/forum/service-ids';
import { TopicRepository } from '@/modules/forum/repositories';

DependencyContainer.bind(TopicRepositoryServiceId).to(TopicRepository);
