import { Avatar, Group } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
import { names, namesCode } from './_mockdata';

const code = `
import { Avatar, Group } from '@empoleon/core';

${namesCode}

function Demo() {
  const avatars = names.map((name) => <Avatar key={name} name={name} color="initials" />);
  return <Group>{avatars}</Group>;
}
`;

function Demo() {
  const avatars = names.map((name) => <Avatar key={name} name={name} color="initials" />);
  return <Group>{avatars}</Group>;
}

export const initials: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
