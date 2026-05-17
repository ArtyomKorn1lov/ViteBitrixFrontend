import { DependencyContainer } from '@/core/dependency-injection';
import { ApiClientServiceId, ValidationProviderServiceId, FileRepositoryServiceId } from '@/core/service-ids';
import { BxApiClient } from '@/core/api-client';
import { ValidationProvider } from '@/core/services';
import { FileBxRepository } from '@/core/repositories';

DependencyContainer.bind(ApiClientServiceId)
  .toDynamicValue(() => new BxApiClient('/'))
  .inSingletonScope();
DependencyContainer.bind(ValidationProviderServiceId).to(ValidationProvider);
DependencyContainer.bind(FileRepositoryServiceId).to(FileBxRepository);
