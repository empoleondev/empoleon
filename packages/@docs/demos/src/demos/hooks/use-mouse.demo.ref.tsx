import { Box, Code, Group, Text } from '@empoleon/core';
import { useMouse } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Text, Code, Group, Box } from '@empoleon/core';
import { useMouse } from '@empoleon/hooks';

function Demo() {
  const { ref, x, y } = useMouse();

  return (
    <>
      <Group justify="center">
        <Box ref={ref} w={300} h={180} bg="var(--mantine-color-blue-light)" />
      </Group>
      <Text ta="center">
        Mouse coordinates <Code>{\`{ x: \${x}, y: \${y} }\`}</Code>
      </Text>
    </>
  );
}
`;

function Demo() {
  const { ref, position } = useMouse();

  return (
    <>
      <Group justify="center">
        <Box ref={ref} w={300} h={180} bg="var(--mantine-color-blue-light)" />
      </Group>
      <Text ta="center" mt="sm">
        Mouse coordinates <Code>{`{ x: ${position().x}, y: ${position().y} }`}</Code>
      </Text>
    </>
  );
}

export const useMouseRef: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
