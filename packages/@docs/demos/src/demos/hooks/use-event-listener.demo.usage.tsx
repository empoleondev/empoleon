import { Button } from '@empoleon/core';
import { useEventListener } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState, useCallback } from 'react';
import { Button } from '@empoleon/core';
import { useEventListener } from '@empoleon/hooks';

function Demo() {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((c) => c + 1), []);
  const ref = useEventListener('click', increment);
  return <Button ref={ref}>Button clicks: {count}</Button>;
}
`;

function Demo() {
  const [count, setCount] = createSignal(0);
  // @ts-ignore
  const increment = () => setCount((c) => c + 1);
  const ref = useEventListener('click', increment);
  // @ts-ignore
  return <Button ref={ref}>Button clicks: {count()}</Button>;
}

export const useEventListenerDemo: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
  centered: true,
};
