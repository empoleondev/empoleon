import { TimePicker } from '@empoleon/dates';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { TimePicker } from '@empoleon/dates';

function Demo() {
  return <TimePicker label="Enter time" withSeconds />;
}
`;

function Demo() {
  return <TimePicker label="Enter time" withSeconds />;
}

export const withSeconds: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
