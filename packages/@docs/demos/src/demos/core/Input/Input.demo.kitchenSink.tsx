import { Input, InputProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconSearch, IconAt, IconLock, IconCurrencyDollar } from '@tabler/icons-solidjs';
import { createSignal, createEffect, Show } from 'solid-js';

const code = `
import { Input } from '@empoleon/core';
import { IconAt } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Input{{props}}
      placeholder="Input component"
      leftSection={<IconAt style={{ width: '70%', height: '70%' }} stroke='1.5' />}
    />
  );
}
`;

function Demo(props: InputProps & {
  leftIconType?: string;
  rightIconType?: string;
  iconSize?: number;
  hasLeftSection?: boolean;
  hasRightSection?: boolean;
  multiline?: boolean;
}) {
  const [value, setValue] = createSignal(
    props.multiline
      ? "asdasdnjknwebdkjwbjrbfkjberfhjbrefhberjfbjherbfjherbfjhb"
      : "default input"
  );

  createEffect(() => {
    setValue(
      props.multiline
        ? "asdasdnjknwebdkjwbjrbfkjberfhjbrefhberjfbjherbfjherbfjhb"
        : "default input"
    );
  });

  const getLeftIcon = () => {
    const iconProps = {
      style: { width: `${props.iconSize || 70}%`, height: `${props.iconSize || 70}%` },
      stroke: '1.5'
    };

    switch (props.leftIconType) {
      case 'at':
        return () => <IconAt {...iconProps} />;
      case 'lock':
        return () => <IconLock {...iconProps} />;
      case 'dollar':
        return () => <IconCurrencyDollar {...iconProps} />;
      case 'search':
      default:
        return () => <IconSearch {...iconProps} />;
    }
  };

  const getRightIcon = () => {
    const iconProps = {
      style: { width: `${props.iconSize || 70}%`, height: `${props.iconSize || 70}%` },
      stroke: '1.5'
    };

    switch (props.rightIconType) {
      case 'at':
        return () => <IconAt {...iconProps} />;
      case 'lock':
        return () => <IconLock {...iconProps} />;
      case 'dollar':
        return () => <IconCurrencyDollar {...iconProps} />;
      case 'search':
      default:
        return () => <IconSearch {...iconProps} />;
    }
  };

  return (
    <Input
      {...props}
      component={props.multiline ? "textarea" : undefined}
      value={value()}
      onChange={(e) => setValue(e.currentTarget.value)}
      leftSection={props.hasLeftSection ? getLeftIcon()() : undefined}
      rightSection={props.hasRightSection ? getRightIcon()() : undefined}
      placeholder={props.multiline ? "Multiline input" : "Input component"}
      rows={props.multiline ? 3 : undefined}
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
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
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'error',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withErrorStyles',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'required',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withAria',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'multiline',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'hasLeftSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'hasRightSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'leftIconType',
      type: 'select',
      initialValue: 'search',
      libraryValue: 'search',
      data: [
        { label: 'Search', value: 'search' },
        { label: 'At (@)', value: 'at' },
        { label: 'Lock', value: 'lock' },
        { label: 'Dollar ($)', value: 'dollar' },
      ],
    },
    {
      prop: 'rightIconType',
      type: 'select',
      initialValue: 'search',
      libraryValue: 'search',
      data: [
        { label: 'Search', value: 'search' },
        { label: 'At (@)', value: 'at' },
        { label: 'Lock', value: 'lock' },
        { label: 'Dollar ($)', value: 'dollar' },
      ],
    },
    {
      prop: 'leftSectionPointerEvents',
      type: 'select',
      initialValue: 'none',
      libraryValue: 'none',
      data: [
        { label: 'None', value: 'none' },
        { label: 'All', value: 'all' },
        { label: 'Auto', value: 'auto' },
      ],
    },
    {
      prop: 'rightSectionPointerEvents',
      type: 'select',
      initialValue: 'none',
      libraryValue: 'none',
      data: [
        { label: 'None', value: 'none' },
        { label: 'All', value: 'all' },
        { label: 'Auto', value: 'auto' },
      ],
    },
  ],
};
