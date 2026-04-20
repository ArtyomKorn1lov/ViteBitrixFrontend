import { SimpleObject } from '@/core';
import { catalogPiniaInstance } from '@/modules/catalog';
import { NewsDetail } from '@/modules/news';
import Translations from '@/translations';
import { createApp } from 'vue';

BX.namespace('BX.Components');

BX.Components.NewsDetail = function (props: SimpleObject) {
  const app = createApp(NewsDetail, props ? props : {});
  app.use(Translations);
  app.use(catalogPiniaInstance);
  app.mount(`#${props.templateId ?? 'app'}`);
};
