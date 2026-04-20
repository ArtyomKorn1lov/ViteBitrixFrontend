import { DependencyContainer } from '@/core';
import { NewsRepositoryServiceId } from '@/modules/news/service-ids';
import { NewsRepository } from '@/modules/news/repositories';

DependencyContainer.bind(NewsRepositoryServiceId).to(NewsRepository);
