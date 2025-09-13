import { Group } from '@empoleon/core';
import { DatePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Group } from '@empoleon/core';
import { DatePicker } from '@empoleon/dates';

function Demo() {
  return (
    <Group justify="center">
      <DatePicker firstDayOfWeek={0} />
      <DatePicker firstDayOfWeek={6} />
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <DatePicker firstDayOfWeek={0} />
      <DatePicker firstDayOfWeek={6} />
    </Group>
  );
}

export const firstDayOfWeek: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
