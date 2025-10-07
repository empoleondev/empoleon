import { createSignal } from 'solid-js';
import { Text, TextInput } from '@empoleon/core';
import { useThrottledValue } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

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
  console.log('[Demo] Current value:', value());

  // Pass the signal accessor (value) not the value itself (value())
  const throttledValue = useThrottledValue(value, 1000);
  console.log('[Demo] Throttled value:', throttledValue());

  return (
    <>
      <TextInput
        placeholder="Search"
        onInput={(event) => {
          const newValue = event.currentTarget.value;
          console.log('[Demo] Input changed to:', newValue);
          setValue(newValue);
        }}
      />
      <Text>Value: {value()}</Text>
      <Text>Throttled value: {throttledValue() || '—'}</Text>
    </>
  );
}

export const useThrottledValueUsage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
