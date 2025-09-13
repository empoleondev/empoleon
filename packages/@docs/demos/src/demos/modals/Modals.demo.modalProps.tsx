import { Button, Text } from '@empoleon/core';
import { modals } from '@empoleon/modals';
import { notifications } from '@empoleon/notifications';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button, Text } from '@empoleon/core';
import { modals } from '@empoleon/modals';

function Demo() {
  const openModal = () => modals.openConfirmModal({
    title: 'Please confirm your action',
    size: 'sm',
    radius: 'md',
    withCloseButton: false,
    children: (
      <Text size="sm">
        This action is so important that you are required to confirm it with a modal. Please click
        one of these buttons to proceed.
      </Text>
    ),
    labels: { confirm: 'Confirm', cancel: 'Cancel' },
    onCancel: () => console.log('Cancel'),
    onConfirm: () => console.log('Confirmed'),
  });

  return <Button onClick={openModal}>Open confirm modal</Button>;
}
`;

function Demo() {
  const openModal = () =>
    modals.openConfirmModal({
      modalId: 'test-id',
      title: 'Please confirm your action',
      size: 'sm',
      radius: 'md',
      withCloseButton: false,
      children: (
        <Text size="sm">
          This action is so important that you are required to confirm it with a modal. Please click
          one of these buttons to proceed.
        </Text>
      ),
      onCancel: () =>
        notifications.show({
          title: 'Canceled',
          message: 'Confirm modal was canceled',
          color: 'gray',
        }),
      onConfirm: () =>
        notifications.show({
          title: 'Confirmed',
          message: 'Confirm modal was confirmed',
          color: 'teal',
        }),
    });

  return <Button onClick={openModal}>Open confirm modal</Button>;
}

export const modalProps: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
