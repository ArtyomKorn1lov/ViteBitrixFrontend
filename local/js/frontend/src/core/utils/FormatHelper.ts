/**
 * @fileOverview
 * @description Хелпер для форматирования строк
 */

export const normalizePhone = (phone: string): string => {
  if (!phone) {
    return '';
  }
  return phone.replace(/[^\d+]/g, '');
};
