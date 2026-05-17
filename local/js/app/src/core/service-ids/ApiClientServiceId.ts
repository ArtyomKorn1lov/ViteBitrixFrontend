import { ServiceIdentifier } from 'inversify';
import { ApiClientInterface } from '@/core/interfaces';

const ApiClientServiceId: ServiceIdentifier<ApiClientInterface> = Symbol.for('ApiClientServiceId');
export default ApiClientServiceId;
