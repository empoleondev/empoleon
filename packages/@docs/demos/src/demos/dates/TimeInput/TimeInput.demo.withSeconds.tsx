import { TimeInput } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TimeInput } from '@empoleon/dates';

function Demo() {
  return <TimeInput withSeconds />;
}
`;

function Demo() {
  return <TimeInput withSeconds />;
}

export const withSeconds: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 340,
  component: Demo,
  code,
};
