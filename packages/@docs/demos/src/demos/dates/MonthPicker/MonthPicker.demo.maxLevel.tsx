import { MonthPicker } from '@empoleon/dates';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { MonthPicker } from '@empoleon/dates';

function Demo() {
  return <MonthPicker maxLevel="year" />;
}
`;

function Demo() {
  return <MonthPicker maxLevel="year" />;
}

export const maxLevel: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
