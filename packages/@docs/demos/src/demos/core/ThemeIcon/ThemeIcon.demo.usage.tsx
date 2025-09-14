import { IconPhoto } from '@tabler/icons-solidjs';
import { ThemeIcon, ThemeIconProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Wrapper(props: ThemeIconProps) {
  return (
    <div style={{ display: 'flex', 'align-items': 'center', 'justify-content': 'center' }}>
      <ThemeIcon {...props}>
        <IconPhoto style={{ width: '70%', height: '70%' }} />
      </ThemeIcon>
    </div>
  );
}

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

export const usage: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'variant',
      type: 'select',
      initialValue: 'filled',
      libraryValue: 'filled',
      data: [
        { label: 'filled', value: 'filled' },
        { label: 'light', value: 'light' },
        { label: 'outline', value: 'outline' },
        { label: 'default', value: 'default' },
        { label: 'white', value: 'white' },
      ],
    },
    { prop: 'radius', type: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { prop: 'size', type: 'size', initialValue: 'md', libraryValue: 'md' },
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
  ],
};
