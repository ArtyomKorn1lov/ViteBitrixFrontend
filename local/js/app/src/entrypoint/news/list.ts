import { catalogPiniaInstance } from '@/modules/catalog';
import { NewList } from '@/modules/news';
import Translations from '@/translations';
import { createApp } from 'vue';
import VLoading from 'element-plus/es/components/loading/index';

// @ts-ignore
BX.namespace('BX.Components');

// @ts-ignore
BX.Components.NewList = function (props) {
  const app = createApp(NewList, props ? props : {});
  app.use(Translations);
  app.use(VLoading);
  app.use(catalogPiniaInstance);
  app.mount(`#${props.templateId ?? 'app'}`);
};
