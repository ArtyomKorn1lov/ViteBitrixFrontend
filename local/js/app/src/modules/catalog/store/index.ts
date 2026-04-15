import { createPinia } from 'pinia';
import useCounter from '@/modules/catalog/store/Counter';

const catalogPiniaInstance = createPinia();

export { useCounter, catalogPiniaInstance };
