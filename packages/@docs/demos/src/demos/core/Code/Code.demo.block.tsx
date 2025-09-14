import { Code } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Code } from '@empoleon/core';

const codeForPreviousDemo = \`import { Code } from '@empoleon/core';

function Demo() {
  return <Code>React.createElement()</Code>;
}\`;

function Demo() {
  return <Code block>{codeForPreviousDemo}</Code>;
}
`;

const codeForPreviousDemo = `import { Code } from '@empoleon/core';

function Demo() {
  return <Code>React.createElement()</Code>;
}`;

function Demo() {
  return <Code block>{codeForPreviousDemo}</Code>;
}

export const block: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
