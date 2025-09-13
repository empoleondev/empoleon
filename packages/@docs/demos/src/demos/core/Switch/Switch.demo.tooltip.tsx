import { Switch, Tooltip } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Switch, Tooltip } from '@empoleon/core';

function Demo() {
  return (
    <Tooltip label="Switch tooltip" refProp="rootRef">
      <Switch label="Switch with tooltip" />
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="Switch tooltip" refProp="rootRef">
      <Switch label="Switch with tooltip" />
    </Tooltip>
  );
}

export const tooltip: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
