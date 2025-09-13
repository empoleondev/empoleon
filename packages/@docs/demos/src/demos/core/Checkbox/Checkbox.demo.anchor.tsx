import { Anchor, Checkbox } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Checkbox, Anchor } from '@empoleon/core';

function Demo() {
  return (
    <Checkbox
      label={
        <>
          I accept{' '}
          <Anchor href="https://mantine.dev" target="_blank" inherit>
            terms and conditions
          </Anchor>
        </>
      }
    />
  );
}
`;

function Demo() {
  return (
    <Checkbox
      label={
        <>
          I accept{' '}
          <Anchor href="https://mantine.dev" target="_blank" inherit>
            terms and conditions
          </Anchor>
        </>
      }
    />
  );
}

export const anchor: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
