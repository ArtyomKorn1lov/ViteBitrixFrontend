/**
 * @fileOverview
 * @description Хелпер для работы с объектами
 */

export const isObject = (object: any) => {
  return typeof object === 'object';
};

export const convertObjectToArray = (object: any) => {
  if (!object) {
    return [];
  }

  let array = [];
  for (const key in object) {
    !!object[key] &&
      array.push({
        code: key,
        value: object[key],
      });
  }

  return array;
};

export const hasProperty = (object: any, propCode: string) => {
  // @ts-ignore
  return Object.hasOwn(object, propCode);
};

export const isEmpty = (object: any) => {
  for (const key in object) {
    if (!hasProperty(object, key)) {
      continue;
    }
    return false;
  }
  return true;
};

export const removeEmptyProperties = (object: any) => {
  for (const key in object) {
    if (isObject(object[key])) {
      object[key] = removeEmptyProperties(object[key]);
    } else if (object[key] === undefined || object[key] === null || object[key] === '') {
      delete object[key];
    }
  }
  return object;
};

export const getAllProperties = (obj: any) => {
  const props = new Set();
  let current = obj;

  while (current && current !== Object.prototype) {
    Object.getOwnPropertyNames(current).forEach((prop) => props.add(prop));
    current = Object.getPrototypeOf(current);
  }

  return Array.from(props).filter((prop) => prop !== 'constructor');
};

export const isCompatibleWithClass = (obj: any, className: any) => {
  if (!isObject(obj) || obj === null) {
    return false;
  }

  if (!(obj instanceof className)) {
    return false;
  }

  const instance = new className();

  const classProps = getAllProperties(instance);
  const objProps = getAllProperties(obj);

  return classProps.every((prop) => objProps.includes(prop));
};
