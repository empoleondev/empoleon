import { IconExternalLink } from '@tabler/icons-solidjs';
import { ActionIcon } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { ActionIcon } from '@empoleon/core';
import { IconExternalLink } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <ActionIcon
      component="a"
      href="https://mantine.dev"
      data-disabled
      size="xl"
      aria-label="Open in a new tab"
      onClick={(event) => event.preventDefault()}
    >
      <IconExternalLink />
    </ActionIcon>
  );
}
`;

function Demo() {
  return (
    <ActionIcon
      component="a"
      href="https://mantine.dev"
      data-disabled
      size="xl"
      aria-label="Open in a new tab"
      onClick={(event) => event.preventDefault()}
    >
      <IconExternalLink />
    </ActionIcon>
  );
}

export const disabledLink: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
