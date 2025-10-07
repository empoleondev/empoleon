import { ActionIcon, ActionIconProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconAdjustments, IconHeart, IconTrash, IconEdit, IconStar } from '@tabler/icons-solidjs';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { ActionIcon } from '@empoleon/core';
import { IconAdjustments } from '@tabler/icons-solidjs';

function Demo() {
  const [loading, setLoading] = createSignal(props.loading || false);

  createEffect(() => {
    setLoading(props.loading || false);
  });

  const getIcon = () => {
    const iconProps = {
      style: { width: \`\${props.iconSize || 70}%\`, height: \`\${props.iconSize || 70}%\` },
      stroke: '1.5'
    };

    switch (props.iconType) {
      case 'heart':
        return () => <IconHeart {...iconProps} />;
      case 'trash':
        return () => <IconTrash {...iconProps} />;
      case 'edit':
        return () => <IconEdit {...iconProps} />;
      case 'star':
        return () => <IconStar {...iconProps} />;
      default:
        return () => <IconAdjustments {...iconProps} />;
    }
  };

  return (
    <ActionIcon{{props}} aria-label="Settings">
      <IconAdjustments style={{ width: '70%', height: '70%' }} stroke='1.5' />
    </ActionIcon>
  );
}
`;

function Demo(props: ActionIconProps & {
  iconType?: string;
  iconSize?: number;
}) {
  const [loading, setLoading] = createSignal(props.loading || false);

  createEffect(() => {
    setLoading(props.loading || false);
  });

  const getIcon = () => {
    const iconProps = {
      style: { width: `${props.iconSize || 70}%`, height: `${props.iconSize || 70}%` },
      stroke: '1.5'
    };

    switch (props.iconType) {
      case 'heart':
        return () => <IconHeart {...iconProps} />;
      case 'trash':
        return () => <IconTrash {...iconProps} />;
      case 'edit':
        return () => <IconEdit {...iconProps} />;
      case 'star':
        return () => <IconStar {...iconProps} />;
      default:
        return () => <IconAdjustments {...iconProps} />;
    }
  };

  return (
    <ActionIcon
      {...props}
      loading={loading()}
      aria-label="Demo ActionIcon"
    >
      {getIcon()()}
    </ActionIcon>
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
      initialValue: 'default',
      libraryValue: 'default',
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
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md'
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
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false
    },
    {
      prop: 'iconType',
      type: 'select',
      initialValue: 'adjustments',
      libraryValue: 'adjustments',
      data: [
        { label: 'Adjustments', value: 'adjustments' },
        { label: 'Heart', value: 'heart' },
        { label: 'Trash', value: 'trash' },
        { label: 'Edit', value: 'edit' },
        { label: 'Star', value: 'star' },
      ],
    }
  ],
};
