import { SimpleObject } from "@/core/types";

/**
 * @fileOverview
 * @description Хелпер для работы с массивами/списками
 */

export const isArray = (array: any): boolean => {
  return array instanceof Array;
};

export const convertArrayToObject = (array: []): SimpleObject => {
  if (!isArray(array)) {
    return {};
  }

  if (!array || array.length <= 0) {
    return {};
  }

  let object: SimpleObject = {};
  array.forEach((item: SimpleObject): void => {
    !!item.code && (object[item.code] = item.value);
  });

  return object;
};

export const changeArrayObjectsCode = (array: SimpleObject[], key: number|string, newKey: number|string): SimpleObject[] => {
  if (!isArray(array)) {
    return [];
  }

  if (!array || array.length <= 0 || !key || !newKey) {
    return [];
  }

  return array.map((item: SimpleObject): SimpleObject => {
    let obj: any = {};
    obj[newKey] = item[key];
    return obj;
  });
};
