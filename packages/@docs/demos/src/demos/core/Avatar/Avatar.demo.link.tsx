import { Avatar } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { avatars } from './_mockdata';

const code = `
import { Avatar } from '@empoleon/core';

function Demo() {
  return (
    <Avatar
      component="a"
      href="https://github.com/rtivital"
      target="_blank"
      src="avatar.png"
      alt="it's me"
    />
  );
}
`;

function Demo() {
  return (
    <Avatar
      component="a"
      href="https://github.com/rtivital"
      target="_blank"
      src={avatars[0]}
      alt="it's me"
    />
  );
}

export const link: EmpoleonDemo = {
  type: 'code',
  centered: true,
  code,
  component: Demo,
};
