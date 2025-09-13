import { DatePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { DatePicker } from '@empoleon/dates';

function Demo() {
  return <DatePicker withWeekNumbers />;
}
`;

function Demo() {
  return <DatePicker withWeekNumbers />;
}

export const withWeekNumbers: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
