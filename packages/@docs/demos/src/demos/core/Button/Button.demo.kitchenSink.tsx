import { Button, ButtonProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconPhoto, IconDownload, IconArrowRight } from '@tabler/icons-solidjs';
import { createSignal, createEffect, Show } from 'solid-js';

const code = `
import { Button } from '@empoleon/core';
import { IconPhoto, IconDownload } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Button{{props}}>
      Button
    </Button>
  );
}
`;

function Demo(props: ButtonProps & {
  leftSectionEnabled?: boolean;
  rightSectionEnabled?: boolean;
  iconSize?: number;
}) {
  const [loading, setLoading] = createSignal(props.loading || false);

  createEffect(() => {
    setLoading(props.loading || false);
  });

  const iconProps = () => ({
    size: props.iconSize || 14,
  });

  return (
    <div style={{ width: '400px', margin: '0 auto', display: 'flex', 'justify-content': 'center' }}>
      <Button
        {...props}
        loading={loading()}
        leftSection={props.leftSectionEnabled ? <IconPhoto {...iconProps()} /> : undefined}
        rightSection={props.rightSectionEnabled ? <IconDownload {...iconProps()} /> : undefined}
      >
        Button
      </Button>
    </div>
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'filled',
      libraryValue: 'filled',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Filled', value: 'filled' },
        { label: 'Light', value: 'light' },
        { label: 'Outline', value: 'outline' },
        { label: 'Subtle', value: 'subtle' },
        { label: 'Transparent', value: 'transparent' },
        { label: 'White', value: 'white' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue'
    },
    {
      prop: 'size',
      type: 'select',
      initialValue: 'sm',
      libraryValue: 'sm',
      data: [
        { label: 'Extra Small', value: 'xs' },
        { label: 'Small', value: 'sm' },
        { label: 'Medium', value: 'md' },
        { label: 'Large', value: 'lg' },
        { label: 'Extra Large', value: 'xl' },
        { label: 'Compact XS', value: 'compact-xs' },
        { label: 'Compact SM', value: 'compact-sm' },
        { label: 'Compact MD', value: 'compact-md' },
        { label: 'Compact LG', value: 'compact-lg' },
        { label: 'Compact XL', value: 'compact-xl' },
      ],
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm'
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'loading',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'fullWidth',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'leftSectionEnabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'rightSectionEnabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'justify',
      type: 'select',
      initialValue: 'center',
      libraryValue: 'center',
      data: [
        { label: 'Center', value: 'center' },
        { label: 'Space Between', value: 'space-between' },
        { label: 'Flex Start', value: 'flex-start' },
        { label: 'Flex End', value: 'flex-end' },
      ],
    },
  ],
};
