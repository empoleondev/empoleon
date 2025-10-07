import { IconBookmark, IconCheck, IconHeart, IconStar, IconX } from '@tabler/icons-solidjs';
import { createEffect, createSignal } from 'solid-js';
import { Chip, ChipProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Wrapper(props: ChipProps & { iconType?: string }) {
  const [checked, setChecked] = createSignal(props.checked ?? false);

  createEffect(() => {
    setChecked(props.checked ?? false);
  });

  const getIcon = () => {
    const iconProps = { size: 16 };

    switch (props.iconType) {
      case 'x':
        return <IconX {...iconProps} />;
      case 'star':
        return <IconStar {...iconProps} />;
      case 'heart':
        return <IconHeart {...iconProps} />;
      case 'bookmark':
        return <IconBookmark {...iconProps} />;
      case 'check':
        return <IconCheck {...iconProps} />;
      default:
        return undefined;
    }
  };

  return (
    <Chip
      {...props}
      checked={checked()}
      onChange={(e) => setChecked(e.currentTarget.checked)}
      icon={getIcon()}
    >
      Awesome chip
    </Chip>
  );
}

const code = `
import { Chip } from '@empoleon/core';

function Demo() {
  return <Chip defaultChecked{{props}}>Awesome chip</Chip>
}
`;

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
    {
      prop: 'variant',
      type: 'segmented',
      data: [
        { value: 'filled', label: 'Filled' },
        { value: 'outline', label: 'Outline' },
        { value: 'light', label: 'Light' },
      ],
      initialValue: 'filled',
      libraryValue: 'filled',
    },
    { prop: 'size', type: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { prop: 'radius', type: 'size', initialValue: 'xl', libraryValue: 'xl' },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'checked',
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
      prop: 'iconType',
      type: 'select',
      initialValue: 'check',
      libraryValue: 'check',
      data: [
        { label: 'Check', value: 'check' },
        { label: 'X', value: 'x' },
        { label: 'Star', value: 'star' },
        { label: 'Heart', value: 'heart' },
        { label: 'Bookmark', value: 'bookmark' },
      ],
    },
    {
      prop: 'type',
      type: 'segmented',
      data: [
        { value: 'checkbox', label: 'Checkbox' },
        { value: 'radio', label: 'Radio' },
      ],
      initialValue: 'checkbox',
      libraryValue: 'checkbox',
    },
  ],
};
