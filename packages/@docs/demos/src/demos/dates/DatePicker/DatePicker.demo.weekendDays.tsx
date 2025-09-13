import { DatePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { DatePicker } from '@empoleon/dates';

function Demo() {
  return <DatePicker weekendDays={[1, 2]} />;
}
`;

function Demo() {
  return <DatePicker weekendDays={[1, 2]} />;
}

export const weekendDays: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
