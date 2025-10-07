import { IconCheck, IconCopy } from '@tabler/icons-solidjs';
import { ActionIcon, CopyButton, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { ActionIcon, CopyButton, Tooltip } from '@empoleon/core';
import { IconCopy, IconCheck } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <CopyButton value="https://mantine.dev" timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
            {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
          </ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  );
}

`;

function Demo() {
  return (
    <CopyButton value="https://mantine.dev" timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          {(props) => (
            <ActionIcon {...props} color={copied ? 'teal' : 'gray'} variant="subtle" onClick={copy}>
              {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
            </ActionIcon>
          )}
        </Tooltip>
      )}
    </CopyButton>
  );
}

export const timeout: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
