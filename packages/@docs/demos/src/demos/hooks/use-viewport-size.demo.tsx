import { Text } from '@empoleon/core';
import { useViewportSize } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { useViewportSize } from '@empoleon/hooks';

function Demo() {
  const { height, width } = useViewportSize();
  return <>Width: {width}, height: {height}</>;
}
`;

function Demo() {
  const viewportSize = useViewportSize();

  return (
    <Text ta="center">
      Width: {viewportSize().width}, height: {viewportSize().height}
    </Text>
  );
}

export const useViewportSizeDemo: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
