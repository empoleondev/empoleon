import { Button, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

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
      <Tooltip target="#hover-me" label="Tooltip over button">
        {(props) => <Button {...props}  id="hover-me">Hover me to see tooltip</Button>}
      </Tooltip>
    </>
  );
}

export const target: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
