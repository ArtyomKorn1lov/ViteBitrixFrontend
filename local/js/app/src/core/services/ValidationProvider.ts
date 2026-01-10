import Translations from '@/translations';
import { EmailRegex, PhoneRegex } from '@/core/constants.ts';
import { ValidationException } from '@/core/exceptions/index.ts';
import { ArrayHelper, ObjectHelper, FormatHelper } from '@/core/utils';

const t = Translations.global.t;

export default class ValidationProvider {
  protected checkUndefined(value: any, code: string): void {
    if (value === undefined) {
      throw new ValidationException(t('core.services.undefinedValueError', { code: code }));
    }
  }

  protected isArray(value: any) {
    return ArrayHelper.isArray(value);
  }

  protected isObject(value: any) {
    return ObjectHelper.isObject(value);
  }

  protected isEmptyObject(value: any) {
    return ObjectHelper.isEmpty(value);
  }

  protected normalizePhone(value: string) {
    return FormatHelper.normalizePhone(value);
  }

  public checkRequired(value: any, code: string = '') {
    this.checkUndefined(value, code);
    if (!value) {
      throw new ValidationException(t('core.services.emptyValueErrorMessage', { code: code }));
    }
    if (this.isObject(value) && this.isEmptyObject(value)) {
      throw new ValidationException(t('core.services.emptyValueErrorMessage', { code: code }));
    }
    if (this.isArray(value) && value.length <= 0) {
      throw new ValidationException(t('core.services.emptyValueErrorMessage', { code: code }));
    }
  }

  public checkEmail(value: any, code: string = '') {
    if (!value) {
      return;
    }
    if (!EmailRegex.test(value)) {
      throw new ValidationException(t('core.services.invalidEmailErrorMessage', { code: code }));
    }
  }

  public checkPhone(value: any, code: string = '') {
    if (!value) {
      return;
    }
    if (!PhoneRegex.test(this.normalizePhone(value))) {
      throw new ValidationException(t('core.services.invalidEmailErrorMessage', { code: code }));
    }
  }

  public checkInstanceOf(value: any, className: any, code: string) {
    if (!value || !className) {
      return;
    }
    if (!ObjectHelper.isCompatibleWithClass(value, className)) {
      throw new ValidationException(
        t('core.services.invalidClassInstance', {
          code: code,
          className: className,
        }),
      );
    }
  }
}
