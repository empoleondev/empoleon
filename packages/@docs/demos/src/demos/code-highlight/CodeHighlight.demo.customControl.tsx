import { IconBrandCodesandbox, IconMessage2 } from '@tabler/icons-solidjs';
import { CodeHighlight, CodeHighlightControl } from '@empoleon/code-highlight';
import { MantineDemo } from '@empoleonx/demo';

const exampleCode = `
function greet() {
  return 'Hello, World!';
}
`;

const code = `
import { IconBrandCodesandbox, IconMessage2 } from '@tabler/icons-solidjs';
import { CodeHighlight, CodeHighlightControl } from '@empoleon/code-highlight';

const exampleCode = \`${exampleCode}\`;

function Demo() {
  return (
    <CodeHighlight
      code={exampleCode}
      language="tsx"
      radius="md"
      controls={[
        <CodeHighlightControl
          component="a"
          href="https://codesandbox.io"
          target="_blank"
          tooltipLabel="Open on codesandbox"
          key="sandbox"
        >
          <IconBrandCodesandbox />
        </CodeHighlightControl>,
        <CodeHighlightControl tooltipLabel="Discuss with GPT" key="gpt">
          <IconMessage2 />
        </CodeHighlightControl>,
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <CodeHighlight
      code={exampleCode}
      language="tsx"
      radius="md"
      controls={[
        <CodeHighlightControl
          component="a"
          href="https://codesandbox.io"
          target="_blank"
          tooltipLabel="Open on codesandbox"
          key="sandbox"
        >
          <IconBrandCodesandbox />
        </CodeHighlightControl>,
        <CodeHighlightControl tooltipLabel="Discuss with GPT" key="gpt">
          <IconMessage2 />
        </CodeHighlightControl>,
      ]}
    />
  );
}

export const customControl: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
