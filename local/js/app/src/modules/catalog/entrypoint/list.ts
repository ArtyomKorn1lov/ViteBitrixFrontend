import { SimpleObject } from '@/core';
import { CatalogList, ElPlus, catalogPiniaInstance } from '@/modules/catalog';
import Translations from '@/translations';
import { createApp } from 'vue';

BX.namespace('BX.Components');

BX.Components.CatalogList = function (props: SimpleObject) {
  console.log('el-plus ', ElPlus);
  const app = createApp(CatalogList, props ? props : {});
  app.use(Translations);
  app.use(catalogPiniaInstance);
  app.mount(`#${props.templateId ?? 'app'}`);
};
