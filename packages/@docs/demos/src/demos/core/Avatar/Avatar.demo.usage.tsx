import { IconStar } from '@tabler/icons-solidjs';
import { Avatar, Group } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { avatars } from './_mockdata';

const code = `
import { Avatar } from '@empoleon/core';
import { IconStar } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <>
      {/* With image */}
      <Avatar src="avatar.png" alt="it's me" />

      {/* Default placeholder */}
      <Avatar radius="xl" />

      {/* Letters with xl radius */}
      <Avatar color="cyan" radius="xl">MK</Avatar>

      {/* Custom placeholder icon */}
      <Avatar color="blue" radius="sm">
        <IconStar size={20} />
      </Avatar>
    </>
  );
}
`;

function Demo() {
  return (
    <Group justify="center">
      <Avatar src={avatars[0]} alt="it's me" />
      <Avatar radius="xl" />
      <Avatar color="cyan" radius="xl">
        MK
      </Avatar>
      <Avatar color="blue" radius="sm">
        <IconStar size={20} />
      </Avatar>
    </Group>
  );
}

export const usage: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
