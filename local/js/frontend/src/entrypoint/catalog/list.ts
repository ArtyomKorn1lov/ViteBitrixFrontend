import { CatalogList, ElPlus } from '@/modules/catalog';
import Translations from '@/translations';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// @ts-ignore
BX.namespace('BX.Components');

// @ts-ignore
BX.Components.CatalogList = function (props) {
  console.log('el-plus ', ElPlus);
  const pinia = createPinia();
  const app = createApp(CatalogList, props ? props : {});
  app.use(Translations);
  app.use(pinia);
  app.mount(`#${props.templateId ?? 'app'}`);
};
