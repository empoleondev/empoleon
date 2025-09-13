import { Button } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';

function Demo() {
  return (
    <Button loading loaderProps={{ type: 'dots' }}>
      Loading button
    </Button>
  );
}
`;

function Demo() {
  return (
    <Button loading loaderProps={{ type: 'dots' }}>
      Loading button
    </Button>
  );
}

export const loaderProps: MantineDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
