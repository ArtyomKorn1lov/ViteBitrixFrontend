import { PropertyValidationTypes } from '@/core/enums';

interface PropertyValidationRule {
  type: PropertyValidationTypes;
  code: string;
  name: string;
}

export default PropertyValidationRule;
