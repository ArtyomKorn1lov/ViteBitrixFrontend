import { ServiceIdentifier } from 'inversify';
import { ValidationProviderInterface } from '@/core/interfaces';

const ValidationProviderServiceId: ServiceIdentifier<ValidationProviderInterface> = Symbol.for('ValidationProviderServiceId');

export default ValidationProviderServiceId;
