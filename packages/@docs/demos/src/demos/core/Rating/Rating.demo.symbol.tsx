import { IconMoon, IconSun } from '@tabler/icons-solidjs';
import { Rating } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Rating } from '@empoleon/core';
import { IconSun, IconMoon } from '@tabler/icons-solidjs';

function Demo() {
  return <Rating emptySymbol={<IconSun size={16} />} fullSymbol={<IconMoon size={16} />} />;
}
`;

function Demo() {
  return <Rating emptySymbol={<IconSun size={16} />} fullSymbol={<IconMoon size={16} />} />;
}

export const symbol: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
