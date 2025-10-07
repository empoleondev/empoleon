import { Chip, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

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
      {(props) => (
        <Chip {...props} defaultChecked>
          Chip with tooltip
        </Chip>
      )}
    </Tooltip>
  );
}

export const tooltip: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
