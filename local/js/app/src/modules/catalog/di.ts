import { DependencyInjection } from '@/core';
import { CatalogRepository } from '@/modules/catalog/repositories';
import { GetRelated } from '@/modules/catalog/use-case';

DependencyInjection.register('CatalogRepositoryInterface', CatalogRepository, ['ApiClient']);
DependencyInjection.register('GetRelated', GetRelated, ['CatalogRepositoryInterface']);
