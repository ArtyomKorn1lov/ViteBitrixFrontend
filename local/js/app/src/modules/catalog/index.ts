import { LocalisationHelper } from '@/core/utils';
import * as Messages from '@/modules/catalog/translations';

LocalisationHelper.addMessages('catalog', Messages);

export * from '@/modules/catalog/models';
export * from '@/modules/catalog/interfaces';
export * from '@/modules/catalog/service-ids';
export * from '@/modules/catalog/repositories';
export * from '@/modules/catalog/use-case';
export * from '@/modules/catalog/store';
export * from '@/modules/catalog/composable';
export * from '@/modules/catalog/components';
export * from '@/modules/catalog/translations';
import ElPlus from '@/modules/catalog/el-plus';

import '@/modules/catalog/di';

export { ElPlus };
