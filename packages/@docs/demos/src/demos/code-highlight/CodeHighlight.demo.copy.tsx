import { CodeHighlight } from '@empoleon/code-highlight';
import { MantineDemo } from '@empoleonx/demo';

const exampleCode = `
function Button() {
  return <button>Click me</button>;
}
`;

const code = `
import { CodeHighlight } from '@empoleon/code-highlight';

const exampleCode = \`${exampleCode}\`;

function Demo() {
  return (
    <>
      <CodeHighlight
        code={\`// Custom copy label\${exampleCode}\`}
        language="tsx"
        copyLabel="Copy button code"
        copiedLabel="Copied!"
        radius="md"
      />
      <CodeHighlight
        code={\`// Without copy button\${exampleCode}\`}
        language="tsx"
        withCopyButton={false}
        mt="md"
        radius="md"
      />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <CodeHighlight
        code={`// Custom copy label${exampleCode}`}
        language="tsx"
        copyLabel="Copy button code"
        copiedLabel="Copied!"
        radius="md"
      />
      <CodeHighlight
        code={`// Without copy button${exampleCode}`}
        language="tsx"
        withCopyButton={false}
        mt="md"
        radius="md"
      />
    </>
  );
}

export const copy: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
