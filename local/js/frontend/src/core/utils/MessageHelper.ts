import { ElMessage, ElMessageBox, ElNotification } from 'element-plus';
import Translations from '@/translations';
import { MessageBoxProps, NotificationProps, ConfirmMessageBoxProps } from "@/core/utils/types.ts";
import { ResponseStatus } from '@/core/enums';

const t = Translations.global.t;

/**
 * @fileOverview
 * @description Хелпер для работы с простыми модальными окнами из element-plus
 */

export const showMessageBox = async (
    {
        title = t('core.messages.errorTitle'),
        message = "",
        type = ResponseStatus.error,
        callback = null
    }: MessageBoxProps
): Promise<void> => {
    // @ts-ignore
    await ElMessageBox.alert(message, title, {
        customClass: 'b-message-box',
        showClose: type === ResponseStatus.success,
        center: true,
        type: type,
        closeOnPressEscape: type === ResponseStatus.success,
        closeOnHashChange: type === ResponseStatus.success,
        showConfirmButton: true,
        confirmButtonClass: 'b-btn b-btn_primary b-btn_normal b-btn_full',
        confirmButtonText: t('core.messages.closeButtonText'),
        callback: callback,
    });
};

export const showNotification = (
    {
        title = t('core.messages.errorTitle'),
        message = "",
        type = ResponseStatus.error
    }: NotificationProps
): void => {
    ElNotification({
        title: title,
        message: message,
        type: type,
    });
};

export const showConfirmMessageBox = async (
    {
        title = "",
        message = "",
        callback = () => {},
        cancelMessage = t('core.messages.cancelDefaultMessage')
    }: ConfirmMessageBoxProps
): Promise<void> => {
  await ElMessageBox.confirm(message, title, {
    customClass: 'b-message-box b-message-box_confirm',
    type: ResponseStatus.warning,
    confirmButtonText: t('core.messages.confirmButtonText'),
    confirmButtonClass: 'b-btn b-btn_primary b-btn_normal',
    cancelButtonClass: 'b-btn b-btn_secondary b-btn_normal',
    cancelButtonText: t('core.messages.cancelButtonText'),
  })
    .then(() => {
      !!callback && callback();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: cancelMessage,
      });
    });
};
