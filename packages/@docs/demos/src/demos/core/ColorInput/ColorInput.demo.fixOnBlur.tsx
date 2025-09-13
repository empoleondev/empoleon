import { ColorInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { ColorInput } from '@empoleon/core';

function Demo() {
  return <ColorInput fixOnBlur={false} label="Value is not fixed on blur" placeholder="May contain invalid value" />;
}
`;

function Demo() {
  return (
    <ColorInput
      fixOnBlur={false}
      label="Value is not fixed on blur"
      placeholder="May contain invalid value"
    />
  );
}

export const fixOnBlur: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
