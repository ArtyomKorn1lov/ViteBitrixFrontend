import Translations from '@/translations';
import { ArgumentException } from '@/core/exceptions/index.ts';

const t = Translations.global.t;

/**
 * @fileOverview
 * @description Хелпер для работы с шаблоном HTML
 */

export const getIcon = (code: string, prefix: string = 'icon'): string => {
  if (!code) {
    throw new ArgumentException(t('core.utils.template.emptyIconErrorMessage'));
  }
  return `<svg aria-hidden='true'><use href='#${prefix}-${code}'/></svg>`;
};

export const getElementByClassName = (className: string): Element | null => {
  if (!className) {
    throw new ArgumentException(t('core.utils.template.emptyCodeErrorMessage'));
  }
  return document.querySelector(`.${className}`);
};

export const scrollToElement = (elementSelector: string, offset: number = 150): void => {
  const slide = elementSelector.length > 0 && document.querySelector(elementSelector);
  if (!slide) {
    return;
  }

  const top = window.scrollY + slide.getBoundingClientRect().y - offset;
  window.scrollTo({
    top: top,
    behavior: 'smooth',
  });
};
