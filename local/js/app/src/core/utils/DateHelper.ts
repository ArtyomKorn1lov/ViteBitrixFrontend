export const formatToDDMMYYYY = (date: Date): string => {
  if (!date) {
    return '';
  }
  const day: string = date.getDate().toString().padStart(2, '0');
  const month: string = (date.getMonth() + 1).toString().padStart(2, '0');
  const fullYear: string = date.getFullYear().toString();
  return `${day}.${month}.${fullYear}`;
};
