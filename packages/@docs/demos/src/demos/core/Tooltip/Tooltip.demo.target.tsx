import { Button, Tooltip } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button, Tooltip } from '@empoleon/core';

function Demo() {
  return (
    <>
      <Tooltip target="#hover-me" label="Tooltip over button" />
      <Button id="hover-me">Hover me to see tooltip</Button>
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <Tooltip target="#hover-me" label="Tooltip over button" />
      <Button id="hover-me">Hover me to see tooltip</Button>
    </>
  );
}

export const target: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
