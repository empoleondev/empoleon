import { Button, Popover, Text } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Popover, Text, Button } from '@empoleon/core';

function Demo() {
  return (
    <Popover width={200} position="bottom" clickOutsideEvents={['mouseup', 'touchend']}>
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Popover will be closed with mouseup and touchend events</Text>
      </Popover.Dropdown>
    </Popover>
  );
}
`;

function Demo() {
  return (
    <Popover width={200} position="bottom" clickOutsideEvents={['mouseup', 'touchend']}>
      <Popover.Target>
        <Button>Toggle popover</Button>
      </Popover.Target>
      <Popover.Dropdown>
        <Text size="xs">Popover will be closed with mouseup and touchend events</Text>
      </Popover.Dropdown>
    </Popover>
  );
}

export const clickOutsideEvents: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
