import { createSignal } from 'solid-js';
import { Code, Group, Text } from '@empoleon/core';
import { useMove } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { Group, Text, Code } from '@empoleon/core';
import { useMove } from '@empoleon/hooks';

function Demo() {
  const [value, setValue] = useState({ x: 0.2, y: 0.6 });
  const { ref, active } = useMove(setValue);

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: 400,
            height: 120,
            backgroundColor: 'var(--empoleon-color-blue-light)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: \`calc(\${value.x * 100}% - 8px)\`,
              top: \`calc(\${value.y * 100}% - 8px)\`,
              width: 16,
              height: 16,
              backgroundColor: active ? 'var(--empoleon-color-teal-7)' : 'var(--empoleon-color-blue-7)',
            }}
          />
        </div>
      </Group>
      <Text ta="center" mt="sm">
        Values <Code>{\`{ x: \${Math.round(value.x * 100)}, y: \${Math.round(value.y * 100)} }\`}</Code>
      </Text>
    </>
  );
}`;

function Demo() {
  const [value, setValue] = createSignal({ x: 0.2, y: 0.6 });
  const { ref, active } = useMove(setValue);

  return (
    <>
      <Group justify="center">
        <div
          ref={ref}
          style={{
            width: '400px',
            height: '120px',
            'background-color': 'var(--empoleon-color-blue-light)',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: `calc(${value().x * 100}% - 8px)`,
              top: `calc(${value().y * 100}% - 8px)`,
              width: '16px',
              height: '16px',
              'background-color': active()
                ? 'var(--empoleon-color-teal-7)'
                : 'var(--empoleon-color-blue-7)',
            }}
          />
        </div>
      </Group>
      <Text ta="center" mt="sm">
        Values{' '}
        <Code>{`{ x: ${Math.round(value().x * 100)}, y: ${Math.round(value().y * 100)} }`}</Code>
      </Text>
    </>
  );
}

export const useMoveUsage: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
