import { Code } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Code } from '@empoleon/core';

function Demo() {
  return <Code>React.createElement()</Code>;
}
`;

function Demo() {
  return <Code>React.createElement()</Code>;
}

export const usage: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
