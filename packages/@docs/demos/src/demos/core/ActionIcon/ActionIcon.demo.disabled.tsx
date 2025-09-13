import { IconHeart } from '@tabler/icons-react';
import { ActionIcon, Group } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { ActionIcon, Group } from '@empoleon/core';
import { IconHeart } from '@tabler/icons-react';

function Demo() {
  return (
    <Group justify="center">
      <ActionIcon size="xl" disabled aria-label="Disabled and not interactive">
        <IconHeart />
      </ActionIcon>

      <ActionIcon size="xl" data-disabled aria-label="Has disabled styles but still interactive">
        <IconHeart />
      </ActionIcon>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <ActionIcon size="xl" disabled aria-label="Disabled and not interactive">
        <IconHeart />
      </ActionIcon>

      <ActionIcon size="xl" data-disabled aria-label="Has disabled styles but still interactive">
        <IconHeart />
      </ActionIcon>
    </Group>
  );
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
