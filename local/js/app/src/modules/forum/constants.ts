import Localisation from '@/core/translations/Localisation';
import { PropertyRuleMap, PropertyValidationTypes } from '@/core';

const t = Localisation.global.t;

export const GROUPS_LIST_LENGTH: number = 2;

export const ITEMS_LIST_LENGTH: number = 4;

export const TOPIC_CREATE_VALIDATION_RULES: PropertyRuleMap = {
  name: {
    type: PropertyValidationTypes.required,
    code: 'name',
    name: t('forum.form.fields.name.title'),
  },
  sectionId: {
    type: PropertyValidationTypes.required,
    code: 'sectionId',
    name: t('forum.form.fields.section.title'),
  },
};

export const TOPIC_UPDATE_VALIDATION_RULES: PropertyRuleMap = {
  ...TOPIC_CREATE_VALIDATION_RULES,
  id: {
    type: PropertyValidationTypes.required,
    code: 'id',
    name: t('forum.form.fields.id.title'),
  },
};
