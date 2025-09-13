import { TimePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TimePicker } from '@empoleon/dates';

function Demo() {
  return <TimePicker label="Enter time" />;
}
`;

function Demo() {
  return <TimePicker label="Enter time" />;
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
