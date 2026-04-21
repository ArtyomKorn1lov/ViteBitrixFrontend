import { SimpleObject } from '@/core';
import { FeedbackForm } from '@/modules/feedback';
import Localisation from '@/core/translations/Localisation';
import { createApp } from 'vue';

BX.namespace('BX.Components');

BX.Components.FeedbackForm = function (props: SimpleObject) {
  const app = createApp(FeedbackForm, props ? props : {});
  app.use(Localisation);
  app.mount(`#${props.templateId ?? 'app'}`);
};
