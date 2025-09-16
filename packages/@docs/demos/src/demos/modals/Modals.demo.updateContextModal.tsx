import { Button } from '@empoleon/core';
import { modals } from '@empoleon/modals';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Button, Text, Stack, Center, Loader } from '@empoleon/core';
import { modals, ContextModalProps, ModalsProvider } from '@empoleon/modals';
import { IconCheck } from '@tabler/icons-solidjs';

const TestModal = ({
  context,
  id,
  innerProps,
}: ContextModalProps<{ modalBody: string, loading: boolean }>) => (
  <>
    <Stack>
      <Text size="sm">{innerProps.modalBody}</Text>
      <Center>
        {innerProps.loading ? (
          <Loader size={32}/>
        ): (
          <IconCheck size={23} color="var(--empoleon-color-teal-6)" />
        )}
      </Center>
    </Stack>
    <Button fullWidth mt="md" disabled={innerProps.loading} onClick={() => context.closeModal(id)}>
      Close modal
    </Button>
  </>
);

function Demo() {
  return (
    <ModalsProvider
      modals={{ demonstration: TestModal /* ...other modals */ }}
    >
      <Button
        onClick={() => {
          const modalId = modals.openContextModal({
            modal: 'asyncDemonstration',
            title: 'Processing...',
            closeOnEscape: false,
            closeOnClickOutside: false,
            closeButtonProps:{ disabled:true },
            innerProps: {
              modalBody:
                'You cannot close this modal until 2 seconds have passed.',
              loading: true,
            },
          });

          setTimeout(() => {
            modals.updateContextModal({
              modalId,
              title: "Processing Complete!",
              closeOnEscape: true,
              closeOnClickOutside: true,
              closeButtonProps:{ disabled: false },
              innerProps: {
                modalBody:
                  'You can now close the modal.',
                loading: false,
              },
            })
          }, 2000);
        }}
      >
        Open updating context modal
      </Button>
    </ModalsProvider>
  );
}
`;

function Demo() {
  return (
    <Button
      onClick={() => {
        const modalId = modals.openContextModal({
          modal: 'asyncDemonstration',
          title: 'Processing...',
          closeOnEscape: false,
          closeOnClickOutside: false,
          closeButtonProps: { disabled: true },
          innerProps: {
            modalBody: 'You cannot close this modal until 2 seconds have passed.',
            loading: true,
          },
        });

        setTimeout(() => {
          modals.updateContextModal({
            modalId,
            title: 'Processing Complete!',
            closeOnEscape: true,
            closeOnClickOutside: true,
            closeButtonProps: { disabled: false },
            innerProps: {
              modalBody: 'You can now close the modal.',
              loading: false,
            },
          });
        }, 2000);
      }}
    >
      Open updating context modal
    </Button>
  );
}

export const updateContextModal: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
