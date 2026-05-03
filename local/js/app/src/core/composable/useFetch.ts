import { ref } from 'vue';
import { UseFetchType } from '@/core/types';
import { MessageTypes } from '@/core/enums';
import { MessageHelper } from '@/core/utils';

export default function useFetch<T>({ callback, messageType = MessageTypes.notification, showMessage = true }: UseFetchType<T>) {
  const isLoading = ref<boolean>(false);

  const displayMessage = async (message: string): Promise<void> => {
    switch (messageType) {
      case MessageTypes.messageBox:
        await MessageHelper.showMessageBox({
          message: message,
        });
        break;
      default:
        MessageHelper.showNotification({
          message: message,
        });
        break;
    }
  };

  const fetch = async (...args: any[]): Promise<T> => {
    try {
      isLoading.value = true;
      const response: T = await callback(...args);
      isLoading.value = false;
      return response;
    } catch (exception: Error | any) {
      isLoading.value = false;
      if (showMessage) {
        await displayMessage(exception?.message);
      }
      throw exception;
    }
  };

  return {
    isLoading,
    fetch,
  };
}
