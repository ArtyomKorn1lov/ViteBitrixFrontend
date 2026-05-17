import '@/ui';
import { SimpleObject } from '@/core';
import { CatalogList, ElPlus, catalogPiniaInstance } from '@/modules/catalog';
import Localisation from '@/core/translations/Localisation';
import { createApp } from 'vue';

BX.namespace('BX.Components');

BX.Components.CatalogList = function (props: SimpleObject) {
  console.log('el-plus ', ElPlus);
  const app = createApp(CatalogList, props ? props : {});
  app.use(Localisation);
  app.use(catalogPiniaInstance);
  app.mount(`#${props.templateId ?? 'app'}`);
};
