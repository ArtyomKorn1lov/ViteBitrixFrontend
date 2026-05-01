import '@/modules/forum/assets/styles/index.scss';
import { LocalisationHelper } from '@/core/utils';
import * as Messages from '@/modules/forum/translations';

LocalisationHelper.addMessages('forum', Messages);

export * from '@/modules/forum/models';
export * from '@/modules/forum/interfaces';
export * from '@/modules/forum/constants';
export * from '@/modules/forum/mappers';
export * from '@/modules/forum/repositories';
export * from '@/modules/forum/service-ids';
export * from '@/modules/forum/use-cases';
export * from '@/modules/forum/components';
export * from '@/modules/forum/translations';

import '@/modules/forum/di';
