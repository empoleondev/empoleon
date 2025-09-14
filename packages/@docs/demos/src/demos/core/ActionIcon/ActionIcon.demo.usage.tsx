import { IconAdjustments } from '@tabler/icons-solidjs';
import { ActionIcon } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { interactiveVariantsControl } from '../../../shared';

const code = `
import { ActionIcon } from '@empoleon/core';
import { IconAdjustments } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <ActionIcon{{props}} aria-label="Settings">
      <IconAdjustments style={{ width: '70%', height: '70%' }} stroke='1.5' />
    </ActionIcon>
  );
}
`;

function Wrapper(props: any) {
  return (
    <ActionIcon {...props} aria-label="Settings">
      <IconAdjustments style={{ width: '70%', height: '70%' }} stroke='1.5' />
    </ActionIcon>
  );
}

export const usage: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    interactiveVariantsControl,
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: 'blue' },
    { prop: 'size', type: 'size', initialValue: 'md', libraryValue: 'md' },
    { prop: 'radius', type: 'size', initialValue: 'sm', libraryValue: 'sm' },
  ],
};
