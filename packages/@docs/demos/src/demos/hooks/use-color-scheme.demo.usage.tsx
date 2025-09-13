import { Badge } from '@empoleon/core';
import { useColorScheme } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Badge } from '@empoleon/core';
import { useColorScheme } from '@empoleon/hooks';

function Demo() {
  const colorScheme = useColorScheme();

  return (
    <Badge color={colorScheme === 'dark' ? 'blue' : 'teal'} variant="filled">
      Your system color scheme is {colorScheme}
    </Badge>
  );
}`;

function Demo() {
  const colorScheme = useColorScheme();

  return (
    <Badge color={colorScheme() === 'dark' ? 'blue' : 'teal'} variant="filled">
      Your system color scheme is {colorScheme()}
    </Badge>
  );
}

export const useColorSchemeDemo: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
