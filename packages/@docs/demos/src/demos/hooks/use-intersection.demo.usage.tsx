import { createSignal } from 'solid-js';
import { Box, Paper, Text } from '@empoleon/core';
import { useIntersection } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useRef } from 'react';
import { useIntersection } from '@empoleon/hooks';
import { Text, Paper, Box } from '@empoleon/core';

function Demo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, entry } = useIntersection({
    root: containerRef.current,
    threshold: 1,
  });

  return (
    <Paper ref={containerRef} h={300} style={{ overflowY: 'scroll' }}>
      <Box pt={260} pb={280}>
        <Paper
          ref={ref}
          p="xl"
          style={{
            backgroundColor: entry?.isIntersecting
              ? 'var(--empoleon-color-teal-7)'
              : 'var(--empoleon-color-red-7)',
            minWidth: '50%',
          }}
        >
          <Text c="#fff" fw={700}>
            {entry?.isIntersecting ? 'Fully visible' : 'Obscured'}
          </Text>
        </Paper>
      </Box>
    </Paper>
  );
}
`;

function Demo() {
  const [containerRef, setContainerRef] = createSignal<HTMLDivElement | null>(null);

  const { ref, entry } = useIntersection({
    root: containerRef(),
    threshold: 1,
  });

  return (
    <Paper ref={setContainerRef} h={300} style={{ 'overflow-y': 'scroll' }}>
      <Box pt={260} pb={280}>
        <Paper
          ref={ref}
          p="xl"
          style={{
            get 'background-color'() {
              return entry()?.isIntersecting
                ? 'var(--empoleon-color-teal-7)'
                : 'var(--empoleon-color-red-7)';
            },
            'min-width': '50%',
          }}
        >
          <Text c="#fff" fw={700}>
            {entry()?.isIntersecting ? 'Fully visible' : 'Obscured'}
          </Text>
        </Paper>
      </Box>
    </Paper>
  );
}

export const useIntersectionDemo: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
