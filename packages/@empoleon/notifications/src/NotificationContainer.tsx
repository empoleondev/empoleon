import { createEffect, onCleanup, onMount, mergeProps, splitProps } from 'solid-js';
import { Notification, NotificationProps } from '@empoleon/core';
import { getAutoClose } from './get-auto-close/get-auto-close';
import { NotificationData } from './notifications.store';

interface NotificationContainerProps extends NotificationProps {
  data: NotificationData;
  onHide: (id: string) => void;
  autoClose: number | false;
}

export function NotificationContainer(props: NotificationContainerProps) {
  const [local, others] = splitProps(props, [
    'data',
    'onHide',
    'autoClose',
    'ref'
  ]);

  const [dataProps, notificationProps] = splitProps(local.data, [
    'message',
  ]);

  const autoCloseDuration = getAutoClose(local.autoClose, local.autoClose);

  let autoCloseTimeout: number = -1;

  const cancelAutoClose = () => window.clearTimeout(autoCloseTimeout);

  const handleHide = () => {
    local.onHide(local.data.id!);
    cancelAutoClose();
  };

  const handleAutoClose = () => {
    if (typeof autoCloseDuration === 'number') {
      autoCloseTimeout = window.setTimeout(handleHide, autoCloseDuration);
    }
  };

  onMount(() => {
    local.data.onOpen?.(local.data);
  });

  createEffect(() => {
    // Access autoCloseDuration to create reactivity
    autoCloseDuration;
    handleAutoClose();

    onCleanup(() => {
      cancelAutoClose();
    });
  });

  // Cleanup on component unmount
  onCleanup(() => {
    cancelAutoClose();
  });

  return (
    <Notification
      {...others}
      {...notificationProps}
      onClose={handleHide}
      ref={local.ref}
      onMouseEnter={cancelAutoClose}
      onMouseLeave={handleAutoClose}
    >
      {dataProps.message}
    </Notification>
  );
}

NotificationContainer.displayName = '@empoleon/notifications/NotificationContainer';
