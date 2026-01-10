import NextDependenceTestServiceInterface from './NextDependenceTestServiceInterface';
import DependenceTestServiceInterface from './DependenceTestServiceInterface';
import TestObject from './TestObject';

interface TestServiceInterface {
  getFirstService: () => DependenceTestServiceInterface;
  getSecondService: () => NextDependenceTestServiceInterface;
  getFlag: () => boolean;
  getCounter: () => number;
  getObject: () => TestObject;
}

export default TestServiceInterface;
