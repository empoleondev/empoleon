import { TimePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TimePicker } from '@empoleon/dates';

function Demo() {
  return <TimePicker label="Enter time" disabled />;
}
`;

function Demo() {
  return <TimePicker label="Enter time" disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
