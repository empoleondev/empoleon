import { Button, Text } from '@empoleon/core';
import { modals } from '@empoleon/modals';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';
import { modals } from '@empoleon/modals';

function Demo() {
  return (
    <Button
      onClick={() => {
        const modalId = modals.open({
          title: 'Initial Modal Title',
          children: <Text>This text will update in 2 seconds.</Text>,
        });

        setTimeout(() => {
          modals.updateModal({
            modalId,
            title: 'Updated Modal Title',
            children: (
              <Text size="sm" c="dimmed">
                This is the updated content of the modal.
              </Text>
            ),
          });
        }, 2000);
      }}
    >
      Open updating modal
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button
      onClick={() => {
        const modalId = modals.open({
          title: 'Initial Modal Title',
          children: <Text size="sm">This text will update after 2 seconds.</Text>,
        });

        setTimeout(() => {
          modals.updateModal({
            modalId,
            title: 'Updated Modal Title',
            children: <Text size="sm">This is the updated content of the modal.</Text>,
          });
        }, 2000);
      }}
    >
      Open updating modal
    </Button>
  );
}

export const updateModal: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
