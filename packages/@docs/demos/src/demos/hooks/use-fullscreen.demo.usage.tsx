import { Button } from '@empoleon/core';
import { useFullscreen } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useFullscreen } from '@empoleon/hooks';
import { Button } from '@empoleon/core';

function Demo() {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <Button onClick={toggle} color={fullscreen ? 'red' : 'blue'}>
      {fullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    </Button>
  );
}
`;

function Demo() {
  const { toggle, fullscreen } = useFullscreen();

  return (
    <Button onClick={toggle} color={fullscreen() ? 'red' : 'blue'}>
      {fullscreen() ? 'Exit Fullscreen' : 'Enter Fullscreen'}
    </Button>
  );
}

export const useFullscreenDemo: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
