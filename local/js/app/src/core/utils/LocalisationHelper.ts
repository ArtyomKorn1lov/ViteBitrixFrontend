import Localisation from '@/core/translations/Localisation';
import { SimpleObject } from '@/core/types';

export const addMessages = (moduleName: string, messages: SimpleObject): void => {
  if (!moduleName || !messages) {
    return;
  }
  const lang: string = Localisation.global.locale;
  const localeMessages: SimpleObject = {
    [moduleName]: messages[lang],
  };
  Localisation.global.mergeLocaleMessage(lang, localeMessages);
};
