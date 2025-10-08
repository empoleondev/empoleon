import { Avatar, AvatarProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { avatars } from './_mockdata';

const code = `
import { Avatar } from '@empoleon/core';
import { IconStar } from '@tabler/icons-solidjs';

function Demo() {
  const getSrc = () => {
    return props.content === 'image' ? avatars[0] : undefined;
  };

  const getName = () => {
    return props.content === 'name' ? 'John Doe' : undefined;
  };
  return (
    <Avatar
      {{props}}
      src={getSrc()}
      name={getName()}
      alt="Demo Avatar"
    >
      <IconStar size={20} />
    </Avatar>
  );
}
`;

function Demo(
  props: AvatarProps & {
    content?: 'icon' | 'image' | 'name' | 'none';
  }
) {
  const getSrc = () => {
    return props.content === 'image' ? avatars[0] : undefined;
  };

  const getName = () => {
    return props.content === 'name' ? 'John Doe' : undefined;
  };

  return <Avatar {...props} src={getSrc()} name={getName()} alt="Demo Avatar" />;
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
      initialValue: 'light',
      libraryValue: 'light',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Filled', value: 'filled' },
        { label: 'Light', value: 'light' },
        { label: 'Outline', value: 'outline' },
        { label: 'Transparent', value: 'transparent' },
        { label: 'White', value: 'white' },
        { label: 'Gradient', value: 'gradient' },
      ],
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'gray',
      libraryValue: 'gray',
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'content',
      type: 'segmented',
      initialValue: 'icon',
      libraryValue: 'none',
      data: [
        { label: 'Icon', value: 'icon' },
        { label: 'Image', value: 'image' },
        { label: 'Name', value: 'name' },
      ],
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
