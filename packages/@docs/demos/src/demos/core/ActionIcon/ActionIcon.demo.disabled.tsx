import { IconHeart } from '@tabler/icons-solidjs';
import { ActionIcon, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { ActionIcon, Group } from '@empoleon/core';
import { IconHeart } from '@tabler/icons-solidjs';

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

export const disabled: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
