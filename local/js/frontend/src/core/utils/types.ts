import { CallbackType } from '@/core/types';
import { ResponseStatus } from '@/core/enums';

export type MessageBoxProps = {
  title?: string;
  message?: string;
  type?: ResponseStatus;
  callback?: CallbackType;
};

export type NotificationProps = {
  title?: string;
  message?: string;
  type?: ResponseStatus;
};

export type ConfirmMessageBoxProps = {
  title?: string;
  message?: string;
  callback?: CallbackType;
  cancelMessage?: string;
};
