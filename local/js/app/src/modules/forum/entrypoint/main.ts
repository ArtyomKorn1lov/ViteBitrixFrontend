import '@/ui';
import { SimpleObject } from '@/core';
import Localisation from '@/core/translations/Localisation';
import { ForumMain } from '@/modules/forum';
import { createApp } from 'vue';

BX.namespace('BX.Components');

BX.Components.ForumMain = function (props: SimpleObject) {
  const app = createApp(ForumMain, props ? props : {});
  app.use(Localisation);
  app.mount(`#${props.templateId ?? 'app'}`);
};
