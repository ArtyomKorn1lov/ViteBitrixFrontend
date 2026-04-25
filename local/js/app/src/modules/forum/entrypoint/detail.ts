import '@/ui';
import { SimpleObject } from '@/core';
import Localisation from '@/core/translations/Localisation';
import { ForumTopicDetail } from '@/modules/forum';
import { createApp } from 'vue';

BX.namespace('BX.Components');

BX.Components.ForumTopicDetail = function (props: SimpleObject) {
  const app = createApp(ForumTopicDetail, props ? props : {});
  app.use(Localisation);
  app.mount(`#${props.templateId ?? 'app'}`);
};
