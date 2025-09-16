import { IconMoonStars, IconSun } from '@tabler/icons-solidjs';
import { Switch } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Switch } from '@empoleon/core';
import { IconSun, IconMoonStars } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={<IconSun size={16} stroke={2.5} color="var(--empoleon-color-yellow-4)" />}
      offLabel={<IconMoonStars size={16} stroke={2.5} color="var(--empoleon-color-blue-6)" />}
    />
  );
}
`;

function Demo() {
  return (
    <Switch
      size="md"
      color="dark.4"
      onLabel={<IconSun size={16} stroke='2.5' color="var(--empoleon-color-yellow-4)" />}
      offLabel={<IconMoonStars size={16} stroke='2.5' color="var(--empoleon-color-blue-6)" />}
    />
  );
}

export const iconLabels: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
