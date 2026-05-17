interface ValidationProviderInterface {
  checkRequired: (value: any, code?: string) => void;
  checkEmail: (value: any, code?: string) => void;
  checkPhone: (value: any, code?: string) => void;
  checkInstanceOf: (value: any, className: any, code: string) => void;
}

export default ValidationProviderInterface;
