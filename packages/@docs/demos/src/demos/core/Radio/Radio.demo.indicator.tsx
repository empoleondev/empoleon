import { Group, Radio } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Radio, Group } from '@empoleon/core';

function Demo() {
  return (
    <Group>
      <Radio.Indicator />
      <Radio.Indicator checked />
      <Radio.Indicator disabled />
      <Radio.Indicator disabled checked />
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <Radio.Indicator />
      <Radio.Indicator checked />
      <Radio.Indicator disabled />
      <Radio.Indicator disabled checked />
    </Group>
  );
}

export const indicator: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
