import { IconEdit, IconHeart, IconPhoto, IconStar, IconTrash } from '@tabler/icons-solidjs';
import { rgba, ThemeIcon, ThemeIconProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { ThemeIcon } from '@empoleon/core';
import { IconPhoto } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <ThemeIcon{{props}}>
      <IconPhoto style={{ width: '70%', height: '70%' }} />
    </ThemeIcon>
  );
}
`;

function Demo(
  props: ThemeIconProps & {
    iconType?: string;
    iconSize?: number;
    gradientType?: boolean;
    color2?: string;
  }
) {
  const getIcon = () => {
    const iconProps = {
      style: { width: `${props.iconSize || 70}%`, height: `${props.iconSize || 70}%` },
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
        return () => <IconPhoto {...iconProps} />;
    }
  };

  const themeIconProps = () => {
    const { gradientType, color, color2, ...rest } = props;

    if (gradientType && color && color2) {
      const color1 = rgba(color, 1);
      const color2Converted = rgba(color2, 1);

      return {
        ...rest,
        variant: 'gradient',
        gradient: { from: color1, to: color2Converted, deg: 90 },
      };
    }

    // Filter out color2 when gradient is off, keep color
    return { ...rest, color };
  };

  return (
    <div style={{ display: 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
      <ThemeIcon {...themeIconProps()}>{getIcon()()}</ThemeIcon>
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
        { label: 'Default', value: 'default' },
        { label: 'White', value: 'white' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
    {
      prop: 'gradientType',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
    },
    {
      prop: 'color2',
      type: 'color',
      initialValue: 'cyan',
      libraryValue: 'cyan',
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
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'iconType',
      type: 'select',
      initialValue: 'photo',
      libraryValue: 'photo',
      data: [
        { label: 'Photo', value: 'photo' },
        { label: 'Heart', value: 'heart' },
        { label: 'Trash', value: 'trash' },
        { label: 'Edit', value: 'edit' },
        { label: 'Star', value: 'star' },
      ],
    },
    {
      prop: 'iconSize',
      type: 'number',
      initialValue: 70,
      libraryValue: 70,
      min: 50,
      max: 100,
      step: 5,
    },
  ],
};
