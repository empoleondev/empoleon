import { TimePicker } from '@empoleon/dates';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { TimePicker } from '@empoleon/dates';

function Demo() {
  return <TimePicker label="Enter time" min="10:00" max="18:30" />;
}
`;

function Demo() {
  return <TimePicker label="Enter time" min="10:00" max="18:30" />;
}

export const minMax: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
