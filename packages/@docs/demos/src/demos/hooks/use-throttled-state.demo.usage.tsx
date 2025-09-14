import { Text, TextInput } from '@empoleon/core';
import { useThrottledState } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Text, TextInput } from '@empoleon/core';
import { useThrottledState } from '@empoleon/hooks';

function Demo() {
  const [throttledValue, setThrottledValue] = useThrottledState('', 1000);

  return (
    <>
      <TextInput
        placeholder="Search"
        onChange={(event) => setThrottledValue(event.currentTarget.value)}
      />
      <Text>Throttled value: {throttledValue || '–'}</Text>
    </>
  );
}
`;

function Demo() {
  const [throttledValue, setThrottledValue] = useThrottledState('', 1000);

  return (
    <>
      <TextInput
        placeholder="Search"
        onChange={(event) => setThrottledValue()(event.currentTarget.value)}
      />
      <Text>Throttled value: {throttledValue() || '–'}</Text>
    </>
  );
}

export const useThrottledStateUsage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
