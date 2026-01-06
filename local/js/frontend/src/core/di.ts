import { DependencyInjection } from '@/core/dependency-injection';
import { ValidationProvider } from '@/core/services';

DependencyInjection.register('ValidationProvider', ValidationProvider);
