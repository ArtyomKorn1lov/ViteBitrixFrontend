import { PropertyRuleMap } from '@/core';

import { TopicCreate, TopicUpdate } from '@/modules/forum/models';

interface TopicValidationServiceInterface {
  validate: (object: TopicCreate | TopicUpdate, rules: PropertyRuleMap) => void;
}

export default TopicValidationServiceInterface;
