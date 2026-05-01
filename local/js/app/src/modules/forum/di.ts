import { DependencyContainer } from '@/core';
import { TopicRepositoryServiceId, TagsRepositoryServiceId } from '@/modules/forum/service-ids';
import { TopicRepository, TagsRepository } from '@/modules/forum/repositories';

DependencyContainer.bind(TopicRepositoryServiceId).to(TopicRepository);
DependencyContainer.bind(TagsRepositoryServiceId).to(TagsRepository);
