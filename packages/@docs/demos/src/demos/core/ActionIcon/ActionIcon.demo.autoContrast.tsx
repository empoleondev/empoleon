import { IconFingerprint } from '@tabler/icons-react';
import { ActionIcon, Group } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { IconFingerprint } from '@tabler/icons-react';
import { ActionIcon, Group } from '@empoleon/core';

function Demo() {
  return (
    <Group>
      <ActionIcon aria-label="default action icon" size="lg" color="lime.4">
        <IconFingerprint size={20} />
      </ActionIcon>
      <ActionIcon autoContrast aria-label="autoContrast action icon" size="lg" color="lime.4">
        <IconFingerprint size={20} />
      </ActionIcon>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <ActionIcon aria-label="default action icon" size="lg" color="lime.4">
        <IconFingerprint size={20} />
      </ActionIcon>
      <ActionIcon autoContrast aria-label="autoContrast action icon" size="lg" color="lime.4">
        <IconFingerprint size={20} />
      </ActionIcon>
    </Group>
  );
}

export const autoContrast: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
