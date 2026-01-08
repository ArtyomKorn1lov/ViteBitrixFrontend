import { createI18n } from 'vue-i18n';

import * as core from '@/translations/core';
import * as ui from '@/translations/ui';
import * as catalog from '@/translations/catalog';

type Namespaces = {
  [key: string]: any;
};

const namespaces: Namespaces = {
  ui,
  core,
  catalog,
};

const localisations: Namespaces = {};

for (const keyNs in namespaces) {
  for (const keyLang in namespaces[keyNs]) {
    if (!localisations[keyLang]) {
      localisations[keyLang] = {};
    }
    localisations[keyLang][keyNs] = namespaces[keyNs][keyLang];
  }
}

/**
 * @description Инициализация языка в приложении
 * @TODO на автотестах не отрабатывает import.meta.env.APP_LANG, нужно будет потом разобраться
 */
const Lang: string = 'en';

/**
 * @description Языковые фразы внутри приложения
 */
export default createI18n({
  locale: Lang,
  fallbackLocale: Lang,
  globalInjection: true,
  messages: localisations,
});
