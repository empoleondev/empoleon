import { ColorPicker } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { ColorPicker } from '@empoleon/core';

function Demo() {
  return <ColorPicker fullWidth size="lg" format="rgba" />;
}
`;

function Demo() {
  return <ColorPicker fullWidth size="lg" format="rgba" />;
}

export const fullWidth: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
