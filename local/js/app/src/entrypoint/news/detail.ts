import { catalogPiniaInstance } from '@/modules/catalog';
import { NewsDetail } from '@/modules/news';
import Translations from '@/translations';
import { createApp } from 'vue';

// @ts-ignore
BX.namespace('BX.Components');

// @ts-ignore
BX.Components.NewsDetail = function (props) {
  const app = createApp(NewsDetail, props ? props : {});
  app.use(Translations);
  app.use(catalogPiniaInstance);
  app.mount(`#${props.templateId ?? 'app'}`);
};
