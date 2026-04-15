import Translations from '@/translations';
import { NotFoundException } from '@/core/exceptions';

const t = Translations.global.t;

/**
 * @description Контейнер зависимостей, простая реализация DI
 */
export default {
  dependencies: new Map<string, any>(),

  register(name: string, className: any, dependencyNames: any[] = [], constructorArgs: any[] = []): void {
    this.dependencies.set(name, {
      className,
      dependencyNames,
      constructorArgs,
    });
  },

  resolve(name: string): any {
    const registration = this.dependencies.get(name);
    if (!registration) {
      throw new NotFoundException(t('core.injection.notFound', { name: name }));
    }

    const { className, dependencyNames, constructorArgs } = registration;
    const resolvedDependencies = dependencyNames.map((dependenceName: string) => this.resolve(dependenceName));

    return new className(...resolvedDependencies, ...constructorArgs);
  },
};
