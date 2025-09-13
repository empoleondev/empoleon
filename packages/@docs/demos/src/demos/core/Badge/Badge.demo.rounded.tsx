import { Badge, Group } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Badge, Group } from '@empoleon/core';

function Demo() {
  return (
    <Group>
      <Badge size="xs" circle>
        1
      </Badge>
      <Badge size="sm" circle>
        7
      </Badge>
      <Badge size="md" circle>
        9
      </Badge>
      <Badge size="lg" circle>
        3
      </Badge>
      <Badge size="xl" circle>
        8
      </Badge>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <Badge size="xs" circle>
        1
      </Badge>
      <Badge size="sm" circle>
        7
      </Badge>
      <Badge size="md" circle>
        9
      </Badge>
      <Badge size="lg" circle>
        3
      </Badge>
      <Badge size="xl" circle>
        8
      </Badge>
    </Group>
  );
}

export const rounded: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
