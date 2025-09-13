import { Button, em, Tooltip } from '@empoleon/core';
import { useMediaQuery } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { Tooltip, Button, em } from '@empoleon/core';
import { useMediaQuery } from '@empoleon/hooks';

function Demo() {
  const isMobile = useMediaQuery(\`(max-width: \${em(750)})\`);

  return (
    <Tooltip label={isMobile ? 'Mobile' : 'Desktop'}>
      <Button>Hover me</Button>
    </Tooltip>
  );
}
`;

function Demo() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  return (
    <Tooltip label={isMobile() ? 'Mobile' : 'Desktop'}>
      {(props) => <Button {...props}>Hover me</Button>}
    </Tooltip>
  );
}

export const useMediaQueryHook: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
