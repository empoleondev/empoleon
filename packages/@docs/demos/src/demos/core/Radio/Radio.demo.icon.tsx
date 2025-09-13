import { CheckIcon, Radio } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Radio, CheckIcon } from '@empoleon/core';

function Demo() {
  return (
    <Radio icon={CheckIcon} label="Custom check icon" name="check" value="check" defaultChecked />
  );
}
`;

function Demo() {
  return (
    <Radio icon={CheckIcon} label="Custom check icon" name="check" value="check" defaultChecked />
  );
}

export const icon: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
