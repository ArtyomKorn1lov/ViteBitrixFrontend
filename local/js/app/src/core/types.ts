import { MessageTypes } from '@/core/enums';

export type CallbackType = ((...args: any[]) => void) | null;

export type SimpleObject = {
  [key: string]: any;
};

export type ConvertedArrayToObject = {
  code: string;
  value: any;
}[];

export type UseFetchType<T> = {
  callback: (...args: any[]) => Promise<T>;
  showMessage?: boolean;
  messageType?: MessageTypes;
};

export type UseFetchingType<T> = {
  callback: (...args: any[]) => Promise<T>;
  showMessage?: boolean;
  args?: any[];
};
