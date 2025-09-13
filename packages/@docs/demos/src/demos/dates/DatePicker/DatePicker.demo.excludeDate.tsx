import { DatePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { DatePicker } from '@empoleon/dates';

function Demo() {
  return <DatePicker excludeDate={(date) => new Date(date).getDay() !== 5} />;
}
`;

function Demo() {
  return <DatePicker excludeDate={(date) => new Date(date).getDay() !== 5} />;
}

export const excludeDate: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
