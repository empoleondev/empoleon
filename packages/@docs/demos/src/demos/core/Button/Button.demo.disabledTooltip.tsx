import { Button, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Button, Tooltip } from '@empoleon/core';

function Demo() {
  return (
    <Tooltip label="Tooltip for disabled button">
      {(props) => <Button data-disabled onClick={(event) => event.preventDefault()}>
        Disabled button with tooltip
      </Button>}
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="Tooltip for disabled button">
      {(props) => <Button {...props} data-disabled onClick={(event) => event.preventDefault()}>
        Disabled button with tooltip
      </Button>}
    </Tooltip>
  );
}

export const disabledTooltip: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
