import { Checkbox } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Checkbox } from '@empoleon/core';

function Demo() {
  return (
    <Checkbox
      defaultChecked
      color="lime.4"
      iconColor="dark.8"
      size="md"
      label="Bright lime checkbox"
    />
  );
}
`;

function Demo() {
  return (
    <Checkbox
      defaultChecked
      color="lime.4"
      iconColor="dark.8"
      size="md"
      label="Bright lime checkbox"
    />
  );
}

export const iconColor: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
