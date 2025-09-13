import { Button } from '@empoleon/core';
import { useLogger } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { useLogger } from '@empoleon/hooks';
import { Button } from '@empoleon/core';

function Demo() {
  const [count, setCount] = useState(0);
  useLogger('Demo', [{ count, hello: 'world' }]);
  return <Button onClick={() => setCount((c) => c + 1)}>Update state ({count})</Button>;
}
`;

function Demo() {
  const [count, setCount] = createSignal(0);
  useLogger('Demo', [{ count, hello: 'world' }]);
  return <Button onClick={() => setCount((c) => c + 1)}>Update state ({count()})</Button>;
}

export const useLoggerDemo: MantineDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
