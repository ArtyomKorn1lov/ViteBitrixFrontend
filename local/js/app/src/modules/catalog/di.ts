import { DependencyContainer } from '@/core';
import { CatalogRepositoryServiceId } from '@/modules/catalog/service-ids';
import { CatalogRepository } from '@/modules/catalog/repositories';

DependencyContainer.bind(CatalogRepositoryServiceId).to(CatalogRepository);
