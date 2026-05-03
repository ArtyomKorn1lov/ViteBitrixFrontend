import { inject, injectable } from 'inversify';
import Localisation from '@/core/translations/Localisation';
import {
  SimpleObject,
  ArgumentException,
  PropertyRuleMap,
  PropertyValidationRule,
  PropertyValidationTypes,
  ValidationException,
  ValidationProviderInterface,
  ValidationProviderServiceId,
} from '@/core';
import { TopicValidationServiceInterface } from '@/modules/forum/interfaces';

const t = Localisation.global.t;

@injectable()
export default class TopicValidationService implements TopicValidationServiceInterface {
  public constructor(
    @inject(ValidationProviderServiceId)
    private validationProvider: ValidationProviderInterface,
  ) {}

  public validate(object: SimpleObject, rules: PropertyRuleMap): void {
    if (!object) {
      throw new ArgumentException(t('forum.validationService.errors.nullOrUndefined'));
    }
    if (!rules) {
      throw new ArgumentException(t('forum.validationService.errors.rulesEmpty'));
    }

    const messages: string[] = [];

    for (const key in object) {
      const objectRule: PropertyValidationRule | undefined = rules[key];
      if (!objectRule) {
        continue;
      }
      switch (objectRule.type) {
        case PropertyValidationTypes.phone:
          try {
            this.validationProvider.checkRequired(object[key], objectRule.name);
            this.validationProvider.checkPhone(object[key], objectRule.name);
          } catch (exception: ValidationException | any) {
            messages.push(exception.message);
          }
          break;
        case PropertyValidationTypes.email:
          try {
            this.validationProvider.checkRequired(object[key], objectRule.name);
            this.validationProvider.checkEmail(object[key], objectRule.name);
          } catch (exception: ValidationException | any) {
            messages.push(exception.message);
          }
          break;
        default:
          try {
            this.validationProvider.checkRequired(object[key], objectRule.name);
          } catch (exception: ValidationException | any) {
            messages.push(exception.message);
          }
          break;
      }
    }

    if (!messages || messages.length <= 0) {
      return;
    }

    throw new ValidationException(this.toHtml(messages));
  }

  private toHtml(messages: string[]): string {
    let html: string = '<ul>';
    messages.forEach((message) => {
      html = html + `<li>${message}</li>`;
    });
    html = html + '</ul>';
    return html;
  }
}
