import { DependencyContainer } from '@/core/dependency-injection';
import { ApiClientServiceId, ValidationProviderServiceId } from '@/core/service-ids';
import { BxApiClient } from '@/core/api-client';
import { ValidationProvider } from '@/core/services';

DependencyContainer.bind(ApiClientServiceId)
  .toDynamicValue(() => new BxApiClient('/'))
  .inSingletonScope();
DependencyContainer.bind(ValidationProviderServiceId).to(ValidationProvider);
