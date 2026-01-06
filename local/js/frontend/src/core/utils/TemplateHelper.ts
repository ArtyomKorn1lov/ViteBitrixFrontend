import Translations from '@/translations';
import { ArgumentException } from '@/core/exceptions/index.ts';

const t = Translations.global.t;

/**
 * @fileOverview
 * @description Хелпер для работы с шаблоном HTML
 */

export const getIcon = (code: string, prefix = 'icon') => {
  if (!code) {
    throw new ArgumentException(t('core.utils.template.emptyIconErrorMessage'));
  }
  return `<svg aria-hidden='true'><use href='#${prefix}-${code}'/></svg>`;
};

export const getElementByClassName = (className: string) => {
  if (!className) {
    throw new ArgumentException(t('core.utils.template.emptyCodeErrorMessage'));
  }
  return document.querySelector(`.${className}`);
};
