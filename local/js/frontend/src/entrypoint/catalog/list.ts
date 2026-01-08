import { CatalogList, ElPlus } from '@/modules/catalog';
import Translations from '@/translations';
import { createApp } from 'vue';

// @ts-ignore
BX.namespace('BX.Components');

// @ts-ignore
BX.Components.CatalogList = function (props) {
  console.log('el-plus ', ElPlus);
  const app = createApp(CatalogList, props ? props : {});
  app.use(Translations);
  app.mount(`#${props.templateId ?? 'app'}`);
};
