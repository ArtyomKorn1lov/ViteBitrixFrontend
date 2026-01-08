/**
 * @fileOverview
 * @description Unit-тесты для ядра приложения
 */

//import 'jest';
import {
  TestObject,
  TestModel,
  NextDependenceTestServiceInterface,
  DependenceTestServiceInterface,
  TestServiceInterface,
  NextDependenceTestService,
  DependenceTestService,
  TestService,
} from '../__mocks__/core';
import Translations from '@/translations';
import { NotFoundException, DependencyInjection } from '@/core';

const t = Translations.global.t;

/** @description Тесты для DI */
describe('core.di', () => {
  let testService: TestServiceInterface;
  let dependenceTestService: DependenceTestServiceInterface;
  let nextDependenceTestService: NextDependenceTestServiceInterface;

  DependencyInjection.register('NextDependenceTestServiceInterface', NextDependenceTestService, [], [1]);
  const obj1: TestModel = {
    count: 15,
    object: {
      value: 1,
      label: 'counter',
    },
  };
  DependencyInjection.register('DependenceTestServiceInterface', DependenceTestService, ['NextDependenceTestServiceInterface'], [true, obj1]);
  const obj2: TestObject = {
    value: 2,
    label: 'counter',
  };
  DependencyInjection.register(
    'TestServiceInterface',
    TestService,
    ['DependenceTestServiceInterface', 'NextDependenceTestServiceInterface'],
    [false, 3, obj2],
  );

  test('should check availability TestService', () => {
    expect(() => {
      testService = DependencyInjection.resolve('TestServiceInterface');
    }).not.toThrow();
  });

  test('should check availability DependenceTestService', () => {
    expect(() => {
      dependenceTestService = DependencyInjection.resolve('DependenceTestServiceInterface');
    }).not.toThrow();
  });

  test('should check availability NextDependenceTestService', () => {
    expect(() => {
      nextDependenceTestService = DependencyInjection.resolve('NextDependenceTestServiceInterface');
    }).not.toThrow();
  });

  test('should check dependencies in TestService', () => {
    const firstService: DependenceTestServiceInterface = testService.getFirstService();
    const secondService: NextDependenceTestServiceInterface = testService.getSecondService();
    const object: TestObject = testService.getObject();
    expect(firstService).not.toBeUndefined();
    expect(secondService).not.toBeUndefined();
    expect(testService.getFlag()).not.toBeUndefined();
    expect(testService.getCounter()).not.toBeUndefined();
    expect(object).not.toBeUndefined();
    expect(firstService.getService()).not.toBeUndefined();
    expect(firstService.getFlag()).not.toBeUndefined();
    const model: TestModel = firstService.getModel();
    expect(model).not.toBeUndefined();
    expect(secondService.getCounter()).not.toBeUndefined();
    expect(secondService.getCounter()).not.toBeUndefined();
    expect(object.value).not.toBeUndefined();
    expect(object.label).not.toBeUndefined();
    expect(model.count).not.toBeUndefined();
    expect(model.object).not.toBeUndefined();
    expect(model.object.value).not.toBeUndefined();
    expect(model.object.label).not.toBeUndefined();
  });

  test('should check dependencies in DependenceTestService', () => {
    const service: NextDependenceTestServiceInterface = dependenceTestService.getService();
    const model: TestModel = dependenceTestService.getModel();
    expect(service).not.toBeUndefined();
    expect(dependenceTestService.getFlag()).not.toBeUndefined();
    expect(model).not.toBeUndefined();
    expect(service.getCounter()).not.toBeUndefined();
    expect(model.count).not.toBeUndefined();
    expect(model.object).not.toBeUndefined();
  });

  test('should check dependencies in NextDependenceTestService', () => {
    expect(nextDependenceTestService.getCounter()).not.toBeUndefined();
  });

  test('should check di to NotFoundException', () => {
    expect(() => {
      DependencyInjection.resolve('Test');
    }).toThrow(NotFoundException);
  });

  test('should check di to NotFoundException message', () => {
    expect(() => {
      DependencyInjection.resolve('Test');
    }).toThrow(t('core.injection.notFound', { name: 'Test' }));
  });
});
