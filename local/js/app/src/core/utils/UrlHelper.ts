export const navigateTo = (page: string): void => {
  if (!page) {
    return;
  }
  window.location.href = page;
};
