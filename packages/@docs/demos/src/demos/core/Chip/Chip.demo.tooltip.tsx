import { Chip, Tooltip } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Tooltip, Chip } from '@empoleon/core';

function Demo() {
  return (
    <Tooltip label="Chip tooltip" refProp="rootRef">
      <Chip defaultChecked>Chip with tooltip</Chip>
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="Chip tooltip" refProp="rootRef">
      <Chip defaultChecked>Chip with tooltip</Chip>
    </Tooltip>
  );
}

export const tooltip: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
