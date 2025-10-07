import { Button, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Tooltip, Button } from '@empoleon/core';

function Demo() {
  return (
    <Tooltip label="Tooltip">
      <Button>Button with tooltip</Button>
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="Tooltip">{(props) => <Button {...props}>Button with tooltip</Button>}</Tooltip>
  );
}

export const usage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
