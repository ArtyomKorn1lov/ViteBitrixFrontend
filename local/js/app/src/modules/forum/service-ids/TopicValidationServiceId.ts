import { ServiceIdentifier } from 'inversify';
import { TopicValidationServiceInterface } from '@/modules/forum/interfaces';

const TopicValidationServiceId: ServiceIdentifier<TopicValidationServiceInterface> = Symbol.for('TopicValidationServiceId');

export default TopicValidationServiceId;
