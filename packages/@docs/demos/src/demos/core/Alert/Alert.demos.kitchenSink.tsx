import { IconAlertCircle, IconCheck, IconInfoCircle, IconX } from '@tabler/icons-solidjs';
import { createEffect, createSignal } from 'solid-js';
import { Alert, AlertProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Alert } from '@empoleon/core';
import { IconInfoCircle } from '@tabler/icons-solidjs';

function Demo() {
  const icon = <IconInfoCircle />;
  return (
    <Alert{{props}} icon={icon}>
      {{children}}
    </Alert>
  );
}
`;

function Demo(
  props: AlertProps & {
    iconType?: string;
  }
) {
  const [withCloseButton, setWithCloseButton] = createSignal(props.withCloseButton || false);

  createEffect(() => {
    setWithCloseButton(props.withCloseButton || false);
  });

  const getIcon = () => {
    switch (props.iconType) {
      case 'info':
        return <IconInfoCircle />;
      case 'alert':
        return <IconAlertCircle />;
      case 'check':
        return <IconCheck />;
      case 'x':
        return <IconX />;
      default:
        return <IconInfoCircle />;
    }
  };

  return (
    <Alert
      {...props}
      icon={getIcon()}
      withCloseButton={withCloseButton()}
      closeButtonLabel={withCloseButton() ? 'Dismiss alert' : undefined}
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 500,
  controls: [
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'light',
      libraryValue: 'light',
      data: [
        { label: 'Light', value: 'light' },
        { label: 'Filled', value: 'filled' },
        { label: 'Outline', value: 'outline' },
        { label: 'Default', value: 'default' },
        { label: 'Transparent', value: 'transparent' },
        { label: 'White', value: 'white' },
      ],
    },
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
      prop: 'title',
      type: 'string',
      initialValue: 'Alert title',
      libraryValue: null,
    },
    {
      prop: 'children',
      type: 'string',
      initialValue:
        'Lorem ipsum dolor sit, amet consectetur adipisicing elit. At officiis, quae tempore necessitatibus placeat saepe.',
      libraryValue: null,
    },
    {
      prop: 'withCloseButton',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'iconType',
      type: 'select',
      initialValue: 'info',
      libraryValue: 'info',
      data: [
        { label: 'Info Circle', value: 'info' },
        { label: 'Alert Circle', value: 'alert' },
        { label: 'Check', value: 'check' },
        { label: 'X', value: 'x' },
      ],
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
  ],
};
