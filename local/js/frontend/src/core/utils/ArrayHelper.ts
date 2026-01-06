/**
 * @fileOverview
 * @description Хелпер для работы с массивами/списками
 */

export const isArray = (array: any) => {
  return array instanceof Array;
};

export const convertArrayToObject = (array: any) => {
  if (!isArray(array)) {
    return {};
  }

  if (!array || array.length <= 0) {
    return {};
  }

  let object: any = {};
  array.forEach((item) => {
    !!item.code && (object[item.code] = item.value);
  });

  return object;
};

export const changeArrayObjectsCode = (array: any, key: any, newKey: any) => {
  if (!isArray(array)) {
    return [];
  }

  if (!array || array.length <= 0 || !key || !newKey) {
    return [];
  }

  return array.map((item) => {
    let obj: any = {};
    obj[newKey] = item[key];
    return obj;
  });
};
