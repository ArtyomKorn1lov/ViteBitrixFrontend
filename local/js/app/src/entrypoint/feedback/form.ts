import { FeedbackForm } from '@/modules/feedback';
import Translations from '@/translations';
import { createApp } from 'vue';

// @ts-ignore
BX.namespace('BX.Components');

// @ts-ignore
BX.Components.FeedbackForm = function (props) {
  const app = createApp(FeedbackForm, props ? props : {});
  app.use(Translations);
  app.mount(`#${props.templateId ?? 'app'}`);
};
