import { MonthPicker } from '@empoleon/dates';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { MonthPicker } from '@empoleon/dates';

function Demo() {
  return <MonthPicker monthsListFormat="MM" yearsListFormat="YY" />;
}
`;

function Demo() {
  return <MonthPicker monthsListFormat="MM" yearsListFormat="YY" />;
}

export const listFormat: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
