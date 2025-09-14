import { IconX } from '@tabler/icons-solidjs';
import { Chip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Chip } from '@empoleon/core';
import { IconX } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Chip
      icon={<IconX size={16} />}
      color="red"
      variant="filled"
      defaultChecked
    >
      Forbidden
    </Chip>
  );
}
`;

function Demo() {
  return (
    <Chip icon={<IconX size={16} />} color="red" variant="filled" defaultChecked>
      Forbidden
    </Chip>
  );
}

export const icon: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
