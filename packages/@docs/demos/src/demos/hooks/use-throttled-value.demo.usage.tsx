import { Text, TextInput } from '@empoleon/core';
import { useThrottledValue } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { Text, TextInput } from '@empoleon/core';
import { useThrottledValue } from '@empoleon/hooks';

function Demo() {
  const [value, setValue] = useState('');
  const throttledValue = useThrottledValue(value, 1000);

  return (
    <>
      <TextInput placeholder="Search" onChange={(event) => setValue(event.currentTarget.value)} />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = createSignal('');
  const throttledValue = useThrottledValue(value(), 1000);

  return (
    <>
      <TextInput placeholder="Search" onChange={(event) => setValue(event.currentTarget.value)} />
      <Text>Throttled value: {throttledValue() || '–'}</Text>
    </>
  );
}

export const useThrottledValueUsage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
