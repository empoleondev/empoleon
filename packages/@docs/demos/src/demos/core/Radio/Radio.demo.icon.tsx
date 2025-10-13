import { CheckIcon, Radio } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

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

export const icon: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
