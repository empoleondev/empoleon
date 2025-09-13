import { DateInput } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { DateInput } from '@empoleon/dates';

function Demo() {
  return <DateInput valueFormat="YYYY MMM DD" label="Date input" placeholder="Date input" />;
}
`;

function Demo() {
  return <DateInput valueFormat="YYYY MMM DD" label="Date input" placeholder="Date input" />;
}

export const format: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
