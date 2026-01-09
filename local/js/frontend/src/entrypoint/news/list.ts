import { NewList } from '@/modules/news';
import Translations from '@/translations';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import VLoading from 'element-plus/es/components/loading/index';

// @ts-ignore
BX.namespace('BX.Components');

// @ts-ignore
BX.Components.NewList = function (props) {
  const pinia = createPinia();
  const app = createApp(NewList, props ? props : {});
  app.use(Translations);
  app.use(VLoading);
  app.use(pinia);
  app.mount(`#${props.templateId ?? 'app'}`);
};
