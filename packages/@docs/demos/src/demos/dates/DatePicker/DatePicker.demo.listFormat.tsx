import { DatePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { DatePicker } from '@empoleon/dates';

function Demo() {
  return <DatePicker monthsListFormat="MM" yearsListFormat="YY" />;
}
`;

function Demo() {
  return <DatePicker monthsListFormat="MM" yearsListFormat="YY" />;
}

export const listFormat: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
