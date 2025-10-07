import { Button, Group, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Tooltip, Button, Group } from '@empoleon/core';

function Demo() {
  return (
    <Tooltip.Group openDelay={500} closeDelay={100}>
      <Group justify="center">
        <Tooltip label="Tooltip 1">
          <Button>Button 1</Button>
        </Tooltip>
        <Tooltip label="Tooltip 2">
          <Button>Button 2</Button>
        </Tooltip>
        <Tooltip label="Tooltip 3">
          <Button>Button 3</Button>
        </Tooltip>
      </Group>
    </Tooltip.Group>
  );
}
`;

function Demo() {
  return (
    <Tooltip.Group openDelay={500} closeDelay={100}>
      <Group justify="center">
        <Tooltip label="Tooltip 1">{(props) => <Button {...props}>Button 1</Button>}</Tooltip>
        <Tooltip label="Tooltip 2">{(props) => <Button {...props}>Button 2</Button>}</Tooltip>
        <Tooltip label="Tooltip 3">{(props) => <Button {...props}>Button 3</Button>}</Tooltip>
      </Group>
    </Tooltip.Group>
  );
}

export const group: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
