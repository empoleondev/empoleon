import { Box, Slider, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { Slider, Text, Box } from '@empoleon/core';

function Demo() {
  const [value, setValue] = useState(50);
  const [endValue, setEndValue] = useState(50);

  return (
    <Box maw={400} mx="auto">
      <Slider value={value} onChange={setValue} onChangeEnd={setEndValue} />

      <Text mt="md" size="sm">
        onChange value: <b>{value}</b>
      </Text>
      <Text mt={5} size="sm">
        onChangeEnd value: <b>{endValue}</b>
      </Text>
    </Box>
  );
}
`;

function Demo() {
  const [value, setValue] = createSignal(50);
  const [endValue, setEndValue] = createSignal(50);

  return (
    <Box maw={400} mx="auto">
      <Slider value={value()} onChange={setValue} onChangeEnd={setEndValue} />

      <Text mt="md" size="sm">
        onChange value: <b>{value()}</b>
      </Text>
      <Text mt={5} size="sm">
        onChangeEnd value: <b>{endValue()}</b>
      </Text>
    </Box>
  );
}

export const changeEnd: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
