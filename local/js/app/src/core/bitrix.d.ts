interface BitrixGlobal {
  [key: string]: any;
}

declare global {
  const BX: BitrixGlobal;
  interface Window {
    BX: BitrixGlobal;
  }
}

export {};
