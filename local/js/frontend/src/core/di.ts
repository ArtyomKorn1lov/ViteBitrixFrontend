import { DependencyInjection } from '@/core/dependency-injection';
import { ApiClient } from '@/core/api-client';
import { ValidationProvider } from '@/core/services';

DependencyInjection.register('ApiClient', ApiClient, [], ['/']);
DependencyInjection.register('ValidationProvider', ValidationProvider);
