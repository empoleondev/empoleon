import { IconFingerprint } from '@tabler/icons-solidjs';
import { Group, ThemeIcon } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { IconFingerprint } from '@tabler/icons-solidjs';
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

export const autoContrast: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
