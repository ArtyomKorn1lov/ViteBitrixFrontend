import { DependencyContainer } from '@/core';
import { TopicRepositoryServiceId, TagsRepositoryServiceId, TopicValidationServiceId } from '@/modules/forum/service-ids';
import { TopicRepository, TagsRepository } from '@/modules/forum/repositories';
import { TopicValidationService } from '@/modules/forum/services';

DependencyContainer.bind(TopicRepositoryServiceId).to(TopicRepository);
DependencyContainer.bind(TagsRepositoryServiceId).to(TagsRepository);
DependencyContainer.bind(TopicValidationServiceId).to(TopicValidationService);
