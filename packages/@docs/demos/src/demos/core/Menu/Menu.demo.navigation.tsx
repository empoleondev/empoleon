import { Group, Menu } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { DemoMenuItems } from './_menu-items';

const code = `
import { Group, Menu } from '@empoleon/core';

function Demo() {
  const menus = Array(4)
    .fill(0)
    .map((e, i) => (
      <Menu

        trigger="click-hover"
        loop={false}
        withinPortal={false}
        trapFocus={false}
        menuItemTabIndex={0}
      >
        {/* ... menu items */}
      </Menu>
    ));
  return <Group>{menus}</Group>;
}
`;

function Demo() {
  const menus = Array(4)
    .fill(0)
    .map((_, i) => (
      <Menu

        trigger="click-hover"
        loop={false}
        withinPortal={false}
        trapFocus={false}
        menuItemTabIndex={0}
      >
        <DemoMenuItems />
      </Menu>
    ));
  return <Group>{menus}</Group>;
}

export const navigation: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
