import { ServiceIdentifier } from 'inversify';
import { FeedbackRepositoryInterface } from '@/modules/feedback/interfaces';

const FeedbackRepositoryServiceId: ServiceIdentifier<FeedbackRepositoryInterface> = Symbol.for('FeedbackRepositoryServiceId');

export default FeedbackRepositoryServiceId;
