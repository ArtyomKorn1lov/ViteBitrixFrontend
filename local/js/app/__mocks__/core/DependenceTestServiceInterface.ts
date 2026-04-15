import NextDependenceTestServiceInterface from './NextDependenceTestServiceInterface';
import TestModel from './TestModel';

interface DependenceTestServiceInterface {
  getService: () => NextDependenceTestServiceInterface;
  getFlag: () => boolean;
  getModel: () => TestModel;
}

export default DependenceTestServiceInterface;
