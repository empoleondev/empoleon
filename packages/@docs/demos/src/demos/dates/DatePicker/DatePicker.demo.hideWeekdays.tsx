import { DatePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { DatePicker } from '@empoleon/dates';

function Demo() {
  return <DatePicker hideWeekdays />;
}
`;

function Demo() {
  return <DatePicker hideWeekdays />;
}

export const hideWeekdays: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
