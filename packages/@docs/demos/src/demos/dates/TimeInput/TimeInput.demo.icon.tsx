import { IconClock } from '@tabler/icons-solidjs';
import { TimeInput } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { IconClock } from '@tabler/icons-solidjs';
import { TimeInput } from '@empoleon/dates';

function Demo() {
  return <TimeInput leftSection={<IconClock size={16} stroke={1.5} />} />;
}
`;

function Demo() {
  return <TimeInput leftSection={<IconClock size={16} stroke='1.5' />} />;
}

export const icon: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 340,
  component: Demo,
  code,
};
