import { Checkbox, Tooltip } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Tooltip, Checkbox } from '@empoleon/core';

function Demo() {
  return (
    <>
      <Tooltip label="Checkbox with tooltip">
        <Checkbox label="Tooltip on checkbox only" />
      </Tooltip>

      <Tooltip label="Checkbox with tooltip" refProp="rootRef">
        <Checkbox label="Tooltip the entire element" mt="md" />
      </Tooltip>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Tooltip label="Checkbox with tooltip">
        <Checkbox label="Tooltip on checkbox only" />
      </Tooltip>

      <Tooltip label="Checkbox with tooltip" refProp="rootRef">
        <Checkbox label="Tooltip the entire element" mt="md" />
      </Tooltip>
    </>
  );
}

export const tooltip: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
