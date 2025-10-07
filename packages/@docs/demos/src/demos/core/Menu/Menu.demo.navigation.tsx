import { For } from 'solid-js';
import { Group, Menu } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { DemoMenuItems } from './_menu-items';

const code = `
import { For } from 'solid-js';
import { Group, Menu } from '@empoleon/core';

function Demo() {
  return <Group>
    <For each={Array(4).fill(0)}>
      {() => (
        <Menu
          trigger="click-hover"
          loop={false}
          withinPortal={false}
          trapFocus={false}
          menuItemTabIndex={0}
        >
          <DemoMenuItems />
        </Menu>
      )}
    </For>
  </Group>;
}
`;

function Demo() {
  return (
    <Group>
      <For each={Array(4).fill(0)}>
        {() => (
          <Menu
            trigger="click-hover"
            loop={false}
            withinPortal={false}
            trapFocus={false}
            menuItemTabIndex={0}
          >
            <DemoMenuItems />
          </Menu>
        )}
      </For>
    </Group>
  );
}

export const navigation: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
