import { Button, CopyButton } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { CopyButton, Button } from '@empoleon/core';

function Demo() {
  return (
    <CopyButton value="https://mantine.dev">
      {({ copied, copy }) => (
        <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
          {copied ? 'Copied url' : 'Copy url'}
        </Button>
      )}
    </CopyButton>
  );
}
`;

function Demo() {
  return (
    <CopyButton value="https://mantine.dev">
      {({ copied, copy }) => (
        <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
          {copied ? 'Copied url' : 'Copy url'}
        </Button>
      )}
    </CopyButton>
  );
}

export const usage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
