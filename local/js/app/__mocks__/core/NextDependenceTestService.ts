import NextDependenceTestServiceInterface from './NextDependenceTestServiceInterface';

export default class NextDependenceTestService implements NextDependenceTestServiceInterface {
  private readonly counter: number;

  public constructor(counter: number) {
    this.counter = counter;
  }

  public getCounter(): number {
    return this.counter;
  }
}
