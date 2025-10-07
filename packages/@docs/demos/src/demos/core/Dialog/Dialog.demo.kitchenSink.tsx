import { Button, Dialog, DialogProps, Group, Text, TextInput } from '@empoleon/core';
import { useDisclosure } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useDisclosure } from '@empoleon/hooks';
import { Dialog, Group, Button, TextInput, Text } from '@empoleon/core';

function Demo() {
  const [opened, { toggle, close }] = useDisclosure(false);

  return (
    <>
      <Group justify="center">
        <Button onClick={toggle}>Toggle dialog</Button>
      </Group>

      <Dialog
        opened={opened()}
        onClose={close}
        {{props}}
      >
        <Text size="sm" mb="xs" fw={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
          <Button onClick={close}>Subscribe</Button>
        </Group>
      </Dialog>
    </>
  );
}
`;

function Demo(props: DialogProps) {
  const [opened, { toggle, close }] = useDisclosure(false);

  const genPosition = (pos: any) => {
    let position;
    switch (pos) {
      case 'bottom-right':
        position = { bottom: 20, right: 20 };
        break;
      case 'bottom-left':
        position = { bottom: 20, left: 20 };
        break;
      case 'top-right':
        position = { top: 20, right: 20 };
        break;
      case 'top-left':
        position = { top: 20, left: 20 };
        break;
      default:
        position = { bottom: 20, right: 20 };
    }

    return position;
  };

  return (
    <>
      <Group justify="center">
        <Button onClick={toggle}>Toggle dialog</Button>
      </Group>

      <Dialog {...props} position={genPosition(props.position)} opened={opened()} onClose={close}>
        <Text size="sm" mb="xs" fw={500}>
          Subscribe to email newsletter
        </Text>

        <Group align="flex-end">
          <TextInput placeholder="hello@gluesticker.com" style={{ flex: 1 }} />
          <Button onClick={close}>Subscribe</Button>
        </Group>
      </Dialog>
    </>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  controls: [
    {
      prop: 'withCloseButton',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'keepMounted',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'lg',
      libraryValue: 'lg',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'shadow',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'withBorder',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'position',
      type: 'select',
      data: [
        { label: 'Bottom Right', value: 'bottom-right' },
        { label: 'Bottom Left', value: 'bottom-left' },
        { label: 'Top Right', value: 'top-right' },
        { label: 'Top Left', value: 'top-left' },
      ],
      initialValue: 'bottom-right',
      libraryValue: 'bottom-right',
    },
    {
      prop: 'withinPortal',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'zIndex',
      type: 'number',
      initialValue: 200,
      libraryValue: 200,
      min: 0,
      max: 9999,
      step: 100,
    },
  ],
};
