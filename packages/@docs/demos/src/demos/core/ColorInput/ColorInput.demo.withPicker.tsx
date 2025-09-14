import { ColorInput } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { ColorInput } from '@empoleon/core';

function Demo() {
  return (
    <ColorInput withPicker={false} pointer label="Without dropdown" placeholder="Enter value" />
  );
}
`;

function Demo() {
  return (
    <ColorInput withPicker={false} pointer label="Without dropdown" placeholder="Enter value" />
  );
}

export const withPicker: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
