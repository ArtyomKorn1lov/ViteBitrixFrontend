import { createApp } from 'vue';
import '@/ui';
import { SimpleObject } from '@/core';
import Localisation from '@/core/translations/Localisation';
import { ForumMain } from '@/modules/forum';

BX.namespace('BX.Components');

BX.Components.ForumMain = function (props: SimpleObject) {
  const app = createApp(ForumMain, props ? props : {});
  app.use(Localisation);
  app.mount(`#${props.templateId ?? 'app'}`);
};
