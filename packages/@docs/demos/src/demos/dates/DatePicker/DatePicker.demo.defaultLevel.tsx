import { Group } from '@empoleon/core';
import { DatePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Group } from '@empoleon/core';
import { DatePicker } from '@empoleon/dates';

function Demo() {
  return (
    <Group justify="center">
      <DatePicker defaultLevel="decade" />
      <DatePicker defaultLevel="year" />
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <DatePicker defaultLevel="decade" />
      <DatePicker defaultLevel="year" />
    </Group>
  );
}

export const defaultLevel: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
