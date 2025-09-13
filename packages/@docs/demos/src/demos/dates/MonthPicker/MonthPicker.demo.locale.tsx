import 'dayjs/locale/ru';

import { MonthPicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import 'dayjs/locale/ru';
import { MonthPicker } from '@empoleon/dates';

function Demo() {
  return <MonthPicker locale="ru" />;
}
`;

function Demo() {
  return <MonthPicker locale="ru" />;
}

export const locale: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
