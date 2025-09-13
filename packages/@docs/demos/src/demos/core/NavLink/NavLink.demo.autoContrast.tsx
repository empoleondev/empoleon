import { NavLink } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { NavLink } from '@empoleon/core';

function Demo() {
  return (
    <>
      <NavLink color="lime.4" variant="filled" active label="Default" />
      <NavLink color="lime.4" variant="filled" active autoContrast label="Auto contrast" />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <NavLink color="lime.4" variant="filled" active label="Default" />
      <NavLink color="lime.4" variant="filled" active autoContrast label="Auto contrast" />
    </>
  );
}

export const autoContrast: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 300,
};
