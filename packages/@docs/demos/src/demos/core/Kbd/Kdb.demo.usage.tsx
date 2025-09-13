import { Kbd } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Kbd } from '@empoleon/core';

function Demo() {
  return (
    <div dir="ltr">
      <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>M</Kbd>
    </div>
  );
}
`;

function Demo() {
  return (
    <div dir="ltr">
      <Kbd>⌘</Kbd> + <Kbd>Shift</Kbd> + <Kbd>M</Kbd>
    </div>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
