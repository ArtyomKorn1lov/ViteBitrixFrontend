import { DependencyInjection } from '@/core';
import { FeedbackRepository } from '@/modules/feedback/repositories';
import { SendFeedback } from '@/modules/feedback/use-case';

DependencyInjection.register('FeedbackRepositoryInterface', FeedbackRepository, ['ApiClient']);
DependencyInjection.register('SendFeedback', SendFeedback, ['FeedbackRepositoryInterface', 'ValidationProvider']);
