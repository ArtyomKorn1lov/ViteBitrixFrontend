import TestServiceInterface from './TestServiceInterface';
import NextDependenceTestServiceInterface from './NextDependenceTestServiceInterface';
import DependenceTestServiceInterface from './DependenceTestServiceInterface';
import TestObject from './TestObject';

export default class TestService implements TestServiceInterface {
  private firstService: DependenceTestServiceInterface;
  private secondService: NextDependenceTestServiceInterface;
  private flag: boolean;
  private counter: number;
  private object: TestObject;

  public constructor(
    firstService: DependenceTestServiceInterface,
    secondService: NextDependenceTestServiceInterface,
    flag: boolean,
    counter: number,
    object: TestObject,
  ) {
    this.firstService = firstService;
    this.secondService = secondService;
    this.flag = flag;
    this.counter = counter;
    this.object = object;
  }

  public getFirstService(): DependenceTestServiceInterface {
    return this.firstService;
  }

  public getSecondService(): NextDependenceTestServiceInterface {
    return this.secondService;
  }

  public getFlag(): boolean {
    return this.flag;
  }

  public getCounter(): number {
    return this.counter;
  }

  public getObject(): TestObject {
    return this.object;
  }
}
