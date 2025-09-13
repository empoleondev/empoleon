import { Code } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Code } from '@empoleon/core';

function Demo() {
  return <Code>React.createElement()</Code>;
}
`;

function Demo() {
  return <Code>React.createElement()</Code>;
}

export const usage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
