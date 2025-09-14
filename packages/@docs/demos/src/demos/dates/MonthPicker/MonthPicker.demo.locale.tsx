import 'dayjs/locale/ru';

import { MonthPicker } from '@empoleon/dates';
import { EmpoleonDemo } from '@empoleonx/demo';

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

export const locale: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
