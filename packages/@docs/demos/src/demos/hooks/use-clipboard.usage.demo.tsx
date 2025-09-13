import { Button } from '@empoleon/core';
import { useClipboard } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';
import { useClipboard } from '@empoleon/hooks';

function Demo() {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <Button
      color={clipboard.copied ? 'teal' : 'blue'}
      onClick={() => clipboard.copy('Hello, world!')}
    >
      {clipboard.copied ? 'Copied' : 'Copy'}
    </Button>
  );
}`;

function Demo() {
  const clipboard = useClipboard({ timeout: 500 });

  return (
    <Button
      color={clipboard.copied() ? 'teal' : 'blue'}
      onClick={() => clipboard.copy('Hello, world!')}
    >
      {clipboard.copied() ? 'Copied' : 'Copy'}
    </Button>
  );
}

export const useClipboardDemo: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
