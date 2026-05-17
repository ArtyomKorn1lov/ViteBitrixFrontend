import { createI18n } from 'vue-i18n';

const Lang: string = import.meta.env.APP_LANG;

export default createI18n({
  locale: Lang,
  fallbackLocale: Lang,
  globalInjection: true,
});
