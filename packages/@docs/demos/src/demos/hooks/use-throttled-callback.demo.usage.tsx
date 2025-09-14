import { Text, TextInput } from '@empoleon/core';
import { useThrottledCallback } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { Text, TextInput } from '@empoleon/core';
import { useThrottledCallback } from '@empoleon/hooks';

function Demo() {
  const [throttledValue, setValue] = useState('');
  const throttledSetValue = useThrottledCallback((value) => setValue(value), 1000);

  return (
    <>
      <TextInput
        placeholder="Search"
        onChange={(event) => throttledSetValue(event.currentTarget.value)}
      />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}
`;

function Demo() {
  const [throttledValue, setValue] = createSignal('');
  const throttledSetValue = useThrottledCallback((value) => setValue(value), 1000);

  return (
    <>
      <TextInput
        placeholder="Search"
        onChange={(event) => throttledSetValue()(event.currentTarget.value)}
      />
      <Text>Throttled value: {throttledValue() || '–'}</Text>
    </>
  );
}

export const useThrottledCallbackUsage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
