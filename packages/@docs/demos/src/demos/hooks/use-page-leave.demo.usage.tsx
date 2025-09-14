import { Text } from '@empoleon/core';
import { usePageLeave } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { usePageLeave } from '@empoleon/hooks';

function Demo() {
  const [leftsCount, setLeftsCount] = useState(0);
  usePageLeave(() => setLeftsCount((p) => p + 1));
  return <>Mouse left the page {leftsCount} times</>;
}
`;

function Demo() {
  const [leftsCount, setLeftsCount] = createSignal(0);
  usePageLeave(() => setLeftsCount((p) => p + 1));
  return <Text ta="center">Mouse left the page {leftsCount()} times</Text>;
}

export const usePageLeaveDemo: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
