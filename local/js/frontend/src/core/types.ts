export type CallbackType = ((...args: any[]) => void) | null;

export type SimpleObject = {
  [key: string]: any;
};

export type ConvertedArrayToObject = {
  code: string;
  value: any;
}[];
