import 'dayjs/locale/ru';

import { DatePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import 'dayjs/locale/ru';
import { DatePicker } from '@empoleon/dates';

function Demo() {
  return <DatePicker locale="ru" />;
}
`;

function Demo() {
  return <DatePicker locale="ru" />;
}

export const locale: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
