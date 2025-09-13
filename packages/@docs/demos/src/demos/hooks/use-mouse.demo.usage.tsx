import { Code, Text } from '@empoleon/core';
import { useMouse } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Text, Code } from '@empoleon/core';
import { useMouse } from '@empoleon/hooks';

function Demo() {
  const { x, y } = useMouse();

  return (
    <Text ta="center">
      Mouse coordinates <Code>{\`{ x: \${x}, y: \${y} }\`}</Code>
    </Text>
  );
}`;

function Demo() {
  const { position } = useMouse();

  return (
    <Text ta="center">
      Mouse coordinates <Code>{`{ x: ${position().x}, y: ${position().y} }`}</Code>
    </Text>
  );
}

export const useMouseUsage: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
