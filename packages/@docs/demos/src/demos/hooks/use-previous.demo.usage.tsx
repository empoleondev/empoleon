import { Text, TextInput } from '@empoleon/core';
import { useInputState, usePrevious } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TextInput, Text } from '@empoleon/core';
import { usePrevious, useInputState } from '@empoleon/hooks';

function Demo() {
  const [value, setValue] = useInputState('');
  const previousValue = usePrevious(value);

  return (
    <div>
      <TextInput
        label="Enter some text here"
        placeholder="Enter some text here"
        id="previous-demo-input"
        value={value}
        onChange={setValue}
      />
      <Text mt="md">Current value: {value}</Text>
      <Text>Previous value: {previousValue}</Text>
    </div>
  );
}
`;

function Demo() {
  const [value, setValue] = useInputState('');
  const previousValue = usePrevious(value);

  return (
    <div>
      <TextInput
        label="Enter some text here"
        placeholder="Enter some text here"
        id="previous-demo-input"
        value={value()}
        onChange={setValue}
      />
      <Text mt="md">Current value: {value()}</Text>
      <Text>Previous value: {previousValue()}</Text>
    </div>
  );
}

export const usePreviousUsage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
