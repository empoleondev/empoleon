import { IconHeart } from '@tabler/icons-solidjs';
import { ActionIcon } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { ActionIcon } from '@empoleon/core';
import { IconHeart } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <ActionIcon size={42} variant="default" aria-label="ActionIcon with size as a number">
      <IconHeart size={24} />
    </ActionIcon>
  );
}
`;

function Demo() {
  return (
    <ActionIcon size={42} variant="default" aria-label="ActionIcon with size as a number">
      <IconHeart size={24} />
    </ActionIcon>
  );
}

export const size: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
