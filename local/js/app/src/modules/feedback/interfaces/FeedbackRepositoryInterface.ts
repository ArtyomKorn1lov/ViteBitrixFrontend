import { CommonResponse } from '@/core';
import { FeedbackModel } from '@/modules/feedback/models';

interface FeedbackRepositoryInterface {
  send: (object: FeedbackModel) => Promise<CommonResponse | null | undefined>;
}

export default FeedbackRepositoryInterface;
