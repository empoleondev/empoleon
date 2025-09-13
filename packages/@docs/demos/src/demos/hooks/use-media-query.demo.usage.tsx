import { Badge, em } from '@empoleon/core';
import { useMediaQuery } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Badge } from '@empoleon/core';
import { useMediaQuery } from '@empoleon/hooks';

function Demo() {
  const matches = useMediaQuery('(min-width: ${em(900)})');

  return (
    <Badge color={matches ? 'teal' : 'red'} variant="filled">
      Breakpoint {matches ? 'matches' : 'does not match'}
    </Badge>
  );
}`;

function Demo() {
  const matches = useMediaQuery(`(min-width: ${em(900)})`);

  return (
    <Badge color={matches() ? 'teal' : 'red'} variant="filled">
      Breakpoint {matches() ? 'matches' : 'does not match'}
    </Badge>
  );
}

export const useMediaQueryDemo: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
