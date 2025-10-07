import { IconHeart } from '@tabler/icons-solidjs';
import { ActionIcon, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { ActionIcon, Tooltip } from '@empoleon/core';
import { IconHeart } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Tooltip label="Tooltip for disabled button">
      {(props) => <ActionIcon {...props} size="xl" data-disabled onClick={(event) => event.preventDefault()}>
        <IconHeart />
      </ActionIcon>}
    </Tooltip>
  );
}
`;

function Demo() {
  return (
    <Tooltip label="Tooltip for disabled button">
      {(props) => <ActionIcon {...props} size="xl" data-disabled onClick={(event) => event.preventDefault()}>
        <IconHeart />
      </ActionIcon>}
    </Tooltip>
  );
}

export const disabledTooltip: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  centered: true,
  code,
};
