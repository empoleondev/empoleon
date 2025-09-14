import { Menu } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { MenuStylesApi } from '@docs/styles-api';
import { DemoMenuItems } from './_menu-items';

const code = `
import { Menu } from '@empoleon/core';

function Demo() {
  return (
    <Menu {...props} opened withArrow position="left">
      {/* ... menu items */}
    </Menu>
  );
}
`;

function Demo(props: any) {
  return (
    <Menu {...props} opened withArrow position="left" trapFocus={false}>
      <DemoMenuItems />
    </Menu>
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: MenuStylesApi,
  component: Demo,
  code,
  centered: true,
};
