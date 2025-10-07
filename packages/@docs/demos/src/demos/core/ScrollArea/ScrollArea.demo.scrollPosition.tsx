import { Box, Code, ScrollArea, Stack, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Content } from './_content';
import { createSignal } from 'solid-js';

const code = `
import { createSignal } from 'solid-js';
import { Text, ScrollArea, Code, Box } from '@empoleon/core';

function Demo() {
  const [scrollPosition, onScrollPositionChange] = createSignal({ x: 0, y: 0 });

  return (
    <>
      <ScrollArea
        w={300}
        h={200}
        onScrollPositionChange={onScrollPositionChange}
      >
        <Box w={600}>
          {/* ... content */}
        </Box>
      </ScrollArea>

      <Text>
        Scroll position: <Code>{\`{ x: \${scrollPosition().x}, y: \${scrollPosition().y} }\`}</Code>
      </Text>
    </>
  );
}
`;

function Demo() {
  const [scrollPosition, onScrollPositionChange] = createSignal({ x: 0, y: 0 });

  return (
    <Stack align="center">
      <ScrollArea w={300} h={200} onScrollPositionChange={onScrollPositionChange}>
        <Box w={600}>
          <Content />
        </Box>
      </ScrollArea>
      <Text>
        Scroll position: <Code>{`{ x: ${scrollPosition().x}, y: ${scrollPosition().y} }`}</Code>
      </Text>
    </Stack>
  );
}

export const scrollPosition: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
