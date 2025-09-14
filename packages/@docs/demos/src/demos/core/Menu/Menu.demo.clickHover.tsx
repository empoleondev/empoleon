import { Menu } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { DemoMenuItems } from './_menu-items';

const code = `
import { Menu } from '@empoleon/core';

function Demo() {
  return (
    <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
      {/* ... menu items */}
    </Menu>
  );
}
`;

function Demo() {
  return (
    <Menu trigger="click-hover" openDelay={100} closeDelay={400}>
      <DemoMenuItems />
    </Menu>
  );
}

export const clickHover: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
