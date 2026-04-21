import '@/modules/forum/assets/styles/index.scss';
import { LocalisationHelper } from '@/core/utils';
import * as Messages from '@/modules/forum/translations';

LocalisationHelper.addMessages('forum', Messages);

export * from '@/modules/forum/models';
export * from '@/modules/forum/components';
export * from '@/modules/forum/translations';
