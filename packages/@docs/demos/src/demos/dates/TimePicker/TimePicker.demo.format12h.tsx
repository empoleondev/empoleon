import { TimePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TimePicker } from '@empoleon/dates';

function Demo() {
  return <TimePicker label="Enter time" format="12h" />;
}
`;

function Demo() {
  return <TimePicker label="Enter time" format="12h" />;
}

export const format12h: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
