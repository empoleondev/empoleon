import { DatePicker } from '@empoleon/dates';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { DatePicker } from '@empoleon/dates';

function Demo() {
  return <DatePicker hideWeekdays />;
}
`;

function Demo() {
  return <DatePicker hideWeekdays />;
}

export const hideWeekdays: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
