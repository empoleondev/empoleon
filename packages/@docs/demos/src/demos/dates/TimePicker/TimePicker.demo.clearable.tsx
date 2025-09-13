import { TimePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TimePicker } from '@empoleon/dates';

function Demo() {
  return <TimePicker label="Enter time" clearable defaultValue="12:34:44" />;
}
`;

function Demo() {
  return <TimePicker label="Enter time" clearable defaultValue="12:34:44" />;
}

export const clearable: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
