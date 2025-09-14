import { Code, Text } from '@empoleon/core';
import { useOrientation } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Code, Text } from '@empoleon/core';
import { useOrientation } from '@empoleon/hooks';

function Demo() {
  const { angle, type } = useOrientation();
  return (
    <>
      <Text>
        Angle: <Code>{angle}</Code>
      </Text>
      <Text>
        Type: <Code>{type}</Code>
      </Text>
    </>
  );
}
`;

function Demo() {
  const orientation = useOrientation();
  return (
    <>
      <Text>
        Angle: <Code>{orientation().angle}</Code>
      </Text>
      <Text>
        Type: <Code>{orientation().type}</Code>
      </Text>
    </>
  );
}

export const useOrientationUsage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
