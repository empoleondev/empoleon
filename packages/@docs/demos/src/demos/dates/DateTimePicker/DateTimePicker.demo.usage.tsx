import { DateTimePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { DateTimePicker } from '@empoleon/dates';

function Demo() {
  return <DateTimePicker label="Pick date and time" placeholder="Pick date and time" />;
}
`;

function Demo() {
  return <DateTimePicker label="Pick date and time" placeholder="Pick date and time" />;
}

export const usage: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
