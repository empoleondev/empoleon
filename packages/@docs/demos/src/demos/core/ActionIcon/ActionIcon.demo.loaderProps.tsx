import { ActionIcon } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { ActionIcon } from '@empoleon/core';

function Demo() {
  return <ActionIcon size="xl" loading loaderProps={{ type: 'dots' }} />;
}
`;

function Demo() {
  return <ActionIcon size="xl" loading loaderProps={{ type: 'dots' }} />;
}

export const loaderProps: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
