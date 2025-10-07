import { IconAlertTriangle, IconCheck, IconInfoCircle, IconX } from '@tabler/icons-solidjs';
import { createEffect, createSignal } from 'solid-js';
import { Box, Notification, NotificationProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Notification } from '@empoleon/core';
import { IconCheck } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Notification{{props}} onClose={() => {}}>
      {{children}}
    </Notification>
  );
}
`;

function Demo(
  props: NotificationProps & {
    iconType?: string;
  }
) {
  const [loading, setLoading] = createSignal(props.loading || false);

  createEffect(() => {
    setLoading(props.loading || false);
  });

  const getIcon = () => {
    switch (props.iconType) {
      case 'check':
        return <IconCheck style={{ width: '20px', height: '20px' }} />;
      case 'x':
        return <IconX style={{ width: '20px', height: '20px' }} />;
      case 'info':
        return <IconInfoCircle style={{ width: '20px', height: '20px' }} />;
      case 'warning':
        return <IconAlertTriangle style={{ width: '20px', height: '20px' }} />;
      default:
        return undefined;
    }
  };

  return (
    <Box maw={400} mx="auto">
      <Notification {...props} loading={loading()} icon={getIcon()} onClose={() => {}} />
    </Box>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  dimmed: true,
  controls: [
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'loading',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withCloseButton',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withBorder',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'title',
      type: 'string',
      initialValue: 'We notify you that',
      libraryValue: '',
    },
    {
      prop: 'children',
      type: 'string',
      initialValue: 'You are now obligated to give a star to Mantine project on GitHub',
      libraryValue: '',
    },
    {
      prop: 'iconType',
      type: 'select',
      initialValue: 'none',
      libraryValue: 'none',
      data: [
        { label: 'None', value: 'none' },
        { label: 'Check', value: 'check' },
        { label: 'X', value: 'x' },
        { label: 'Info', value: 'info' },
        { label: 'Warning', value: 'warning' },
      ],
    },
  ],
};
