import { ref } from 'vue';
import Localisation from '@/core/translations/Localisation';
import { ArgumentException } from '@/core/exceptions';
import { MessageHelper } from '@/core/utils';
import { BaseUseCase } from '@/core/use-case';

const t = Localisation.global.t;

/**
 * @description Примесь с общей логикой обработки запросов, получение информации об ошибке, флаг isLoading и получение данных как реактивного значения
 */
export default function useFetching<T extends BaseUseCase, K>({
  useCase = null,
  showMessage = true,
  args = [],
}: {
  useCase?: T | null;
  showMessage?: boolean;
  args?: any[];
}) {
  const data = ref<K>();
  const isLoading = ref<boolean>(false);
  const error = ref<Error | null>(null);

  const fetch = async (): Promise<void> => {
    try {
      isLoading.value = true;
      // @ts-ignore
      data.value = await useCase.execute(...args);
      isLoading.value = false;
    } catch (exception: any) {
      isLoading.value = false;
      error.value = { ...exception };
      if (showMessage) {
        MessageHelper.showNotification({
          message: exception?.message,
        });
      }
    }
  };

  if (!useCase) {
    throw new ArgumentException(t('core.composable.emptyRequestMethod'));
  }
  fetch();
  return {
    data,
    error,
    isLoading,
  };
}
