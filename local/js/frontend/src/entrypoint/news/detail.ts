import { NewsDetail } from '@/modules/news';
import Translations from '@/translations';
import { createApp } from 'vue';
import { createPinia } from 'pinia';

// @ts-ignore
BX.namespace('BX.Components');

// @ts-ignore
BX.Components.NewsDetail = function (props) {
  const pinia = createPinia();
  const app = createApp(NewsDetail, props ? props : {});
  app.use(Translations);
  app.use(pinia);
  app.mount(`#${props.templateId ?? 'app'}`);
};
