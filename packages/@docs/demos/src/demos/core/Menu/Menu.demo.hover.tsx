import { Menu } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
import { DemoMenuItems } from './_menu-items';

const code = `
import { Menu } from '@empoleon/core';

function Demo() {
  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      {/* ... menu items */}
    </Menu>
  );
}
`;

function Demo() {
  return (
    <Menu trigger="hover" openDelay={100} closeDelay={400}>
      <DemoMenuItems />
    </Menu>
  );
}

export const hover: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
