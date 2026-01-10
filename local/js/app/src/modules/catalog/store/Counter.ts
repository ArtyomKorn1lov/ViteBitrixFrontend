import { defineStore } from 'pinia';
import { CounterStore } from '@/modules/catalog/models';

const useCounter = defineStore('counter', {
  state: (): CounterStore => {
    return {
      counter: 1,
    };
  },
  getters: {
    get(state: CounterStore): number {
      return state.counter;
    },
  },
  actions: {
    increment(): void {
      this.counter++;
    },
    decrement(): void {
      this.counter--;
    },
  },
});

export default useCounter;
