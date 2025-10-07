import { Badge, EMPOLEON_TRANSITIONS, Group, keys, Tooltip } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

export function Demo() {
  const transitions = keys(EMPOLEON_TRANSITIONS).map((transition) => (
    <Tooltip label={transition} transitionProps={{ transition, duration: 300 }}>
      {(props) => (
        <Badge {...props} variant="light">
          {transition}
        </Badge>
      )}
    </Tooltip>
  ));

  return (
    <Group justify="center" style={{ cursor: 'default' }}>
      {transitions}
    </Group>
  );
}

export const transitions: EmpoleonDemo = {
  type: 'code',
  component: Demo,
};
