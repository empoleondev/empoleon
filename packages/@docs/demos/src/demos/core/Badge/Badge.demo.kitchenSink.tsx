import { IconAt, IconX } from '@tabler/icons-solidjs';
import { createEffect, createSignal } from 'solid-js';
import { Badge, BadgeProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal, createEffect, Show } from 'solid-js';
import { Badge } from '@empoleon/core';

function Demo() {
  const [showLeft, setShowLeft] = createSignal(props.showLeftSection || false);
  const [showRight, setShowRight] = createSignal(props.showRightSection || false);

  createEffect(() => {
    setShowLeft(props.showLeftSection || false);
    setShowRight(props.showRightSection || false);
  });

  const leftSection = () => showLeft() ? <IconAt style={{ width: '12px', height: '12px' }} /> : undefined;
  const rightSection = () => showRight() ? <IconX style={{ width: '10px', height: '10px' }} /> : undefined;

  return (
    <Badge{{props}}>
      Badge Text
    </Badge>
  );
}
`;

function Demo(
  props: BadgeProps & {
    showLeftSection?: boolean;
    showRightSection?: boolean;
    badgeText?: string;
  }
) {
  const [showLeft, setShowLeft] = createSignal(props.showLeftSection || false);
  const [showRight, setShowRight] = createSignal(props.showRightSection || false);

  createEffect(() => {
    setShowLeft(props.showLeftSection || false);
    setShowRight(props.showRightSection || false);
  });

  const leftSection = () =>
    showLeft() ? <IconAt style={{ width: '12px', height: '12px' }} /> : undefined;
  const rightSection = () =>
    showRight() ? <IconX style={{ width: '10px', height: '10px' }} /> : undefined;

  return (
    <div style={{ width: '400px', margin: '0 auto', display: 'flex', 'justify-content': 'center' }}>
      <Badge {...props} leftSection={leftSection()} rightSection={rightSection()}>
        {props.badgeText || 'Badge Text'}
      </Badge>
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
        { label: 'Filled', value: 'filled' },
        { label: 'Light', value: 'light' },
        { label: 'Outline', value: 'outline' },
        { label: 'Dot', value: 'dot' },
        { label: 'Transparent', value: 'transparent' },
        { label: 'Default', value: 'default' },
        { label: 'White', value: 'white' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
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
      initialValue: 'xl',
      libraryValue: 'xl',
    },
    {
      prop: 'circle',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'fullWidth',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'showLeftSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'showRightSection',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'badgeText',
      type: 'string',
      initialValue: 'Badge Text',
      libraryValue: 'Badge Text',
    },
  ],
};
