import DependenceTestServiceInterface from './DependenceTestServiceInterface';
import NextDependenceTestServiceInterface from './NextDependenceTestServiceInterface';
import TestModel from './TestModel';

export default class DependenceTestService implements DependenceTestServiceInterface {
  private service: NextDependenceTestServiceInterface;
  private flag: boolean;
  private model: TestModel;

  public constructor(service: NextDependenceTestServiceInterface, flag: boolean, model: TestModel) {
    this.service = service;
    this.flag = flag;
    this.model = model;
  }

  public getService(): NextDependenceTestServiceInterface {
    return this.service;
  }

  public getFlag(): boolean {
    return this.flag;
  }

  public getModel(): TestModel {
    return this.model;
  }
}
