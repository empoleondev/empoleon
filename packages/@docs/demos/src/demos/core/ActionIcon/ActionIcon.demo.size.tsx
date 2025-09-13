import { IconHeart } from '@tabler/icons-react';
import { ActionIcon } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { ActionIcon } from '@empoleon/core';
import { IconHeart } from '@tabler/icons-react';

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

export const size: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
