import { createApp } from 'vue';
import VLoading from 'element-plus/es/components/loading/index';
import '@/ui';
import { SimpleObject } from '@/core';
import Localisation from '@/core/translations/Localisation';
import { ForumMain } from '@/modules/forum';

BX.namespace('BX.Components');

BX.Components.ForumMain = function (props: SimpleObject) {
  const app = createApp(ForumMain, props ? props : {});
  app.use(Localisation);
  app.use(VLoading);
  app.mount(`#${props.templateId ?? 'app'}`);
};
