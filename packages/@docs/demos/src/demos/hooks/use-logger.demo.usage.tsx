import { createSignal } from 'solid-js';
import { Button } from '@empoleon/core';
import { useLogger } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

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
  useLogger('Demo', () => [{ count: count(), hello: 'world' }]);
  return <Button onClick={() => setCount((c) => c + 1)}>Update state ({count()})</Button>;
}

export const useLoggerDemo: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
