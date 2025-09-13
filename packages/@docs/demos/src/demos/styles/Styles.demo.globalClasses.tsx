import { Group } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Group } from '@empoleon/core';

function Demo() {
  return (
    <Group>
      <button type="button" class="mantine-focus-auto">
        Focus auto
      </button>
      <button type="button" class="mantine-focus-always">
        Focus always
      </button>
      <button type="button" class="mantine-focus-never">
        Focus never
      </button>
      <button type="button" class="mantine-active">
        Active
      </button>
    </Group>
  );
}
`;

function Demo() {
  return (
    <Group>
      <button type="button" class="mantine-focus-auto">
        Focus auto
      </button>
      <button type="button" class="mantine-focus-always">
        Focus always
      </button>
      <button type="button" class="mantine-focus-never">
        Focus never
      </button>
      <button type="button" class="mantine-active">
        Active
      </button>
    </Group>
  );
}

export const globalClasses: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
