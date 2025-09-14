import { IconXboxX } from '@tabler/icons-solidjs';
import { CloseButton } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { IconXboxX } from '@tabler/icons-solidjs';
import { CloseButton } from '@empoleon/core';

function Demo() {
  return <CloseButton icon={<IconXboxX size={18} stroke='1.5' />} />;
}
`;

function Demo() {
  return <CloseButton icon={<IconXboxX size={18} stroke='1.5' />} />;
}

export const icon: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
