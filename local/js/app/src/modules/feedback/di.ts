import { DependencyContainer } from '@/core';
import { FeedbackRepositoryServiceId } from '@/modules/feedback/service-ids';
import { FeedbackRepository } from '@/modules/feedback/repositories';

DependencyContainer.bind(FeedbackRepositoryServiceId).to(FeedbackRepository);
