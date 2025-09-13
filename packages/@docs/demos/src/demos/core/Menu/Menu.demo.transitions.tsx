import { Menu } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
import { DemoMenuItems } from './_menu-items';

const code = `
import { Menu } from '@empoleon/core';

function Demo() {
  return (
    <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      {/* Menu content */}
    </Menu>
  );
}
`;

function Demo() {
  return (
    <Menu transitionProps={{ transition: 'rotate-right', duration: 150 }}>
      <DemoMenuItems />
    </Menu>
  );
}

export const transitions: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
