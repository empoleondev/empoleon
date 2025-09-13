import { Group } from '@empoleon/core';
import { DatePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Group } from '@empoleon/core';
import { DatePicker } from '@empoleon/dates';

function Demo() {
  return (
    <Group justify="center">
      <DatePicker maxLevel="year" />
      <DatePicker maxLevel="month" />
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <DatePicker maxLevel="year" />
      <DatePicker maxLevel="month" />
    </Group>
  );
}

export const maxLevel: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
