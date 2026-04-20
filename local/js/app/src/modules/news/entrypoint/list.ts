import { SimpleObject } from '@/core';
import { catalogPiniaInstance } from '@/modules/catalog';
import { NewList } from '@/modules/news';
import Translations from '@/translations';
import { createApp } from 'vue';
import VLoading from 'element-plus/es/components/loading/index';

BX.namespace('BX.Components');

BX.Components.NewList = function (props: SimpleObject) {
  const app = createApp(NewList, props ? props : {});
  app.use(Translations);
  app.use(VLoading);
  app.use(catalogPiniaInstance);
  app.mount(`#${props.templateId ?? 'app'}`);
};
