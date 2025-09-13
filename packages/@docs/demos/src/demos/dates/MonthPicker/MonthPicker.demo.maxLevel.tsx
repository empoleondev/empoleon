import { MonthPicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { MonthPicker } from '@empoleon/dates';

function Demo() {
  return <MonthPicker maxLevel="year" />;
}
`;

function Demo() {
  return <MonthPicker maxLevel="year" />;
}

export const maxLevel: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
