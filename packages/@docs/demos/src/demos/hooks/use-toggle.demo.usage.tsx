import { Button } from '@empoleon/core';
import { upperFirst, useToggle } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Button } from '@empoleon/core';
import { useToggle } from '@empoleon/hooks';

function Demo() {
  const [value, toggle] = useToggle(['blue', 'orange', 'cyan', 'teal']);

  return (
    <Button color={value} onClick={() => toggle()}>
      {value}
    </Button>
  );
}
`;

function Demo() {
  const [value, toggle] = useToggle(['blue', 'orange', 'cyan', 'teal']);

  return (
    <Button color={value()} onClick={() => toggle()}>
      {upperFirst(value())}
    </Button>
  );
}

export const useToggleDemo: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
