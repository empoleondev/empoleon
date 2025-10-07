import { Avatar, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { names, namesCode } from './_mockdata';
import { For } from 'solid-js';

const code = `
import { Avatar, Group } from '@empoleon/core';

${namesCode}

function Demo() {
  return <Group>
    <For each={names}>
      {(name) => (
        <Avatar name={name} color="initials" allowedInitialsColors={['blue', 'red']} />
      )}
    </For>
  </Group>;
}
`;

function Demo() {
  return <Group>
    <For each={names}>
      {(name) => (
        <Avatar name={name} color="initials" allowedInitialsColors={['blue', 'red']} />
      )}
    </For>
  </Group>;
}

export const allowedColors: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
