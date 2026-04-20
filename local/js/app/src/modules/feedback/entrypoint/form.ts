import { SimpleObject } from '@/core';
import { FeedbackForm } from '@/modules/feedback';
import Translations from '@/translations';
import { createApp } from 'vue';

BX.namespace('BX.Components');

BX.Components.FeedbackForm = function (props: SimpleObject) {
  const app = createApp(FeedbackForm, props ? props : {});
  app.use(Translations);
  app.mount(`#${props.templateId ?? 'app'}`);
};
