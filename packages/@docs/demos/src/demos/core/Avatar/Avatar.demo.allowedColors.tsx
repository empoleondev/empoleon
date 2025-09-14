import { Avatar, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { names, namesCode } from './_mockdata';

const code = `
import { Avatar, Group } from '@empoleon/core';

${namesCode}

function Demo() {
  const avatars = names.map((name) => (
    <Avatar name={name} color="initials" allowedInitialsColors={['blue', 'red']} />
  ));
  return <Group>{avatars}</Group>;
}
`;

function Demo() {
  const avatars = names.map((name) => (
    <Avatar name={name} color="initials" allowedInitialsColors={['blue', 'red']} />
  ));
  return <Group>{avatars}</Group>;
}

export const allowedColors: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
