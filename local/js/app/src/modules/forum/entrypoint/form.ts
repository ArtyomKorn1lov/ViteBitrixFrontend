import '@/ui';
import { SimpleObject } from '@/core';
import Localisation from '@/core/translations/Localisation';
import { TopicForm } from '@/modules/forum';
import { createApp } from 'vue';

BX.namespace('BX.Components');

BX.Components.TopicForm = function (props: SimpleObject) {
  const app = createApp(TopicForm, props ? props : {});
  app.use(Localisation);
  app.mount(`#${props.templateId ?? 'app'}`);
};
