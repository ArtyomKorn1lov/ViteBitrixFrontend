import { computed, ComputedRef } from 'vue';
import { useCounter } from '@/modules/catalog/store';

interface CounterHookResult {
  count: ComputedRef<number>;
  increment: () => void;
  decrement: () => void;
}

export default function useCounterHook(): CounterHookResult {
  const store = useCounter();

  const count = computed<number>(() => store.get);

  const increment = (): void => {
    store.increment();
  };

  const decrement = (): void => {
    store.decrement();
  };

  return {
    count,
    increment,
    decrement,
  };
}
