import { PasswordInput, PasswordInputProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconLock } from '@tabler/icons-solidjs';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { PasswordInput } from '@empoleon/core';

function Demo() {
  return (
    <PasswordInput
      {{props}}
      placeholder="Enter your password"
    />
  );
}
`;

function Demo(props: PasswordInputProps & {
  showLabel?: boolean;
  showDescription?: boolean;
  showError?: boolean;
  showLeftSection?: boolean;
  showAsterisk?: boolean;
}) {
  const [visible, setVisible] = createSignal(props.visible || false);

  createEffect(() => {
    setVisible(props.visible || false);
  });

  const getLeftSection = () => {
    if (props.showLeftSection) {
      return <IconLock style={{ width: '70%', height: '70%' }} stroke="1.5" />;
    }
    return undefined;
  };

  return (
    <PasswordInput
      {...props}
      label={props.showLabel ? 'Password' : undefined}
      description={props.showDescription ? props.description : ''}
      error={props.showError ? 'Password is required' : props.error}
      withAsterisk={props.showAsterisk}
      leftSection={getLeftSection()}
      leftSectionPointerEvents={props.showLeftSection ? 'none' : undefined}
      visible={visible()}
      onVisibilityChange={setVisible}
      placeholder="Enter your password"
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 420,
  controls: [
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Filled', value: 'filled' },
        { label: 'Unstyled', value: 'unstyled' },
      ],
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm'
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm'
    },
    {
      prop: 'showLabel',
      type: 'boolean',
      initialValue: true,
      libraryValue: false
    },
    {
      prop: 'showDescription',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'description',
      type: 'string',
      initialValue: 'Password must include at least one letter, number and special character',
      libraryValue: ''
    },
    {
      prop: 'showError',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'showAsterisk',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'visible',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'showLeftSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'withErrorStyles',
      type: 'boolean',
      initialValue: true,
      libraryValue: true
    },
    {
      prop: 'leftSectionWidth',
      type: 'number',
      initialValue: 36,
      libraryValue: 36,
      min: 20,
      max: 80,
      step: 4
    },
    {
      prop: 'rightSectionWidth',
      type: 'number',
      initialValue: 36,
      libraryValue: 36,
      min: 20,
      max: 80,
      step: 4
    },
  ],
};
