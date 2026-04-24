import { ref } from 'vue';
import { UseFetchingType } from '@/core/types';
import { MessageHelper } from '@/core/utils';

export default function useFetching<T>({ callback, showMessage = true, args = [] }: UseFetchingType<T>) {
  const data = ref<T>();
  const isLoading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const fetch = async (): Promise<void> => {
    try {
      isLoading.value = true;
      data.value = await callback(...args);
      isLoading.value = false;
    } catch (exception: Error | any) {
      isLoading.value = false;
      error.value = { ...exception };
      if (showMessage) {
        MessageHelper.showNotification({
          message: exception?.message,
        });
      }
    }
  };

  fetch();
  return {
    data,
    error,
    isLoading,
  };
}
