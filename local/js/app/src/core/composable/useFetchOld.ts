import Localisation from '@/core/translations/Localisation';
import { ArgumentException } from '@/core/exceptions';
import { MessageTypes } from '@/core/enums';
import { MessageHelper } from '@/core/utils';
import { BaseUseCase } from '@/core/use-case';

const t = Localisation.global.t;

/**
 * @description Примесь с общей логикой обработки запросов, вывод всплывающего окна сообщения об ошибке
 */
export default function useFetchOld<T extends BaseUseCase, K>({
  useCase = null,
  showMessage = true,
  messageType = MessageTypes.notification,
}: {
  useCase?: T | null;
  showMessage?: boolean;
  messageType?: MessageTypes;
}) {
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

  return async (...args: any[]): Promise<K> => {
    try {
      if (!useCase) {
        throw new ArgumentException(t('core.composable.emptyRequestMethod'));
      }
      return await useCase.execute(...args);
    } catch (exception: any) {
      if (showMessage) {
        await displayMessage(exception?.message);
      }
      throw exception;
    }
  };
}
