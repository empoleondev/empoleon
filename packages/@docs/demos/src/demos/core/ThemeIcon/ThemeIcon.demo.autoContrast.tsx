import { IconFingerprint } from '@tabler/icons-react';
import { Group, ThemeIcon } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { IconFingerprint } from '@tabler/icons-react';
import { ThemeIcon, Group } from '@empoleon/core';

function Demo() {
  return (
    <Group>
      <ThemeIcon size="lg" color="lime.4">
        <IconFingerprint size={20} />
      </ThemeIcon>
      <ThemeIcon size="lg" color="lime.4" autoContrast>
        <IconFingerprint size={20} />
      </ThemeIcon>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <ThemeIcon size="lg" color="lime.4">
        <IconFingerprint size={20} />
      </ThemeIcon>
      <ThemeIcon size="lg" color="lime.4" autoContrast>
        <IconFingerprint size={20} />
      </ThemeIcon>
    </Group>
  );
}

export const autoContrast: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
