import { MonthPicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { MonthPicker } from '@empoleon/dates';

function Demo() {
  return <MonthPicker monthsListFormat="MM" yearsListFormat="YY" />;
}
`;

function Demo() {
  return <MonthPicker monthsListFormat="MM" yearsListFormat="YY" />;
}

export const listFormat: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
