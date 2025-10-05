import { CloseButton } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { IconXboxX } from '@tabler/icons-solidjs';

const code = `
import { CloseButton } from '@empoleon/core';

function Demo() {
  return <CloseButton{{props}} />;
}
`;

function Wrapper(props: any) {
  const getIcon = () => {
    if (props.iconType === 'xbox') {
      return <IconXboxX size={props.size} stroke='1.5' />;
    }
    return undefined;
  };

  return <CloseButton {...props} icon={getIcon()} />;
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    { prop: 'size', type: 'size', initialValue: 'md', libraryValue: 'md' },
    {
      prop: 'variant',
      type: 'segmented',
      data: ['transparent', 'subtle'],
      libraryValue: 'subtle',
      initialValue: 'subtle',
    },
    { prop: 'radius', type: 'size', initialValue: 'sm', libraryValue: 'sm' },
    { prop: 'disabled', type: 'boolean', initialValue: false, libraryValue: false },
    {
      prop: 'iconType',
      type: 'select',
      initialValue: 'default',
      libraryValue: 'default',
      data: [
        { label: 'Default', value: 'default' },
        { label: 'Xbox X', value: 'xbox' },
      ],
    },
  ],
};
