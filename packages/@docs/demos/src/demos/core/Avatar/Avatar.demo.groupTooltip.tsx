import { Avatar, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { avatars } from './_mockdata';

const code = `
import { Avatar, Tooltip } from '@empoleon/core';

function Demo() {
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        <Tooltip label="Salazar Troop" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip label="Bandit Crimes" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip label="Jane Rata" withArrow>
          <Avatar src="image.png" radius="xl" />
        </Tooltip>
        <Tooltip
          withArrow
          label={
            <>
              <div>John Outcast</div>
              <div>Levi Capitan</div>
            </>
          }
        >
          <Avatar radius="xl">+2</Avatar>
        </Tooltip>
      </Avatar.Group>
    </Tooltip.Group>
  );
}
`;

function Demo() {
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        <Tooltip label="Salazar Troop" withArrow>
          {(props) => <Avatar {...props} src={avatars[0]} radius="xl" />}
        </Tooltip>
        <Tooltip label="Bandit Crimes" withArrow>
          {(props) => <Avatar {...props} src={avatars[1]} radius="xl" />}
        </Tooltip>
        <Tooltip label="Jane Rata" withArrow>
          {(props) => <Avatar {...props} src={avatars[2]} radius="xl" />}
        </Tooltip>
        <Tooltip
          withArrow
          label={
            <>
              <div>John Outcast</div>
              <div>Levi Capitan</div>
            </>
          }
        >
          {(props) => <Avatar {...props} radius="xl">+2</Avatar>}
        </Tooltip>
      </Avatar.Group>
    </Tooltip.Group>
  );
}

export const groupTooltip: EmpoleonDemo = {
  type: 'code',
  centered: true,
  code,
  component: Demo,
};
