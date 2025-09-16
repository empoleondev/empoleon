import { Group, Text, useEmpoleonTheme } from '@empoleon/core';
import { useElementSize } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useElementSize } from '@empoleon/hooks';

function Demo() {
  const { ref, width, height } = useElementSize();

  return (
    <>
      <textarea ref={ref} style={{ width: 400, height: 120 }} />
      <div>Width: {width}, height: {height}</div>
    </>
  );
}`;

function Demo() {
  const theme = useEmpoleonTheme();
  const { ref, width, height } = useElementSize();

  return (
    <>
      <Text ta="center" size="sm" style={{ marginBottom: theme.spacing.xs }}>
        Resize textarea by dragging its right bottom corner
      </Text>

      <Group justify="center">
        <textarea
          ref={ref}
          aria-label="Resize me"
          style={{
            width: '400px',
            height: '120px',
            border: 'none',
            'background-color': 'var(--empoleon-color-body)',
            position: 'relative',
          }}
        />
      </Group>
      <Text ta="center" mt="sm">
        Width: {width()}, height: {height()}
      </Text>
    </>
  );
}

export const useElementSizeDemo: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  dimmed: true,
};
