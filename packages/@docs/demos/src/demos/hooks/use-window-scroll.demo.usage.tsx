import { Button, Group, Text } from '@empoleon/core';
import { useWindowScroll } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { useWindowScroll } from '@empoleon/hooks';
import { Button, Text, Group } from '@empoleon/core';

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Group justify="center">
      <Text>
        Scroll position x: {scroll.x}, y: {scroll.y}
      </Text>
      <Button onClick={() => scrollTo({ y: 0 })}>Scroll to top</Button>
    </Group>
  );
}
`;

function Demo() {
  const [scroll, scrollTo] = useWindowScroll();

  return (
    <Group justify="center">
      <Text>
        Scroll position x: {scroll().x}, y: {scroll().y}
      </Text>
      <Button onClick={() => scrollTo({ y: 0 })}>Scroll to top</Button>
    </Group>
  );
}

export const useWindowScrollDemo: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
};
