import { AngleSlider, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { AngleSlider, Text } from '@empoleon/core';

function Demo() {
  const [value, setValue] = useState(0);
  const [endValue, setEndValue] = useState(0);

  return (
    <>
      <AngleSlider value={value} onChange={setValue} onChangeEnd={setEndValue} />
      <Text mt="md">Current value: {value}</Text>
      <Text>End value: {endValue}</Text>
    </>
  );
}
`;

function Demo() {
  const [value, setValue] = createSignal(0);
  const [endValue, setEndValue] = createSignal(0);

  return (
    <>
      <AngleSlider value={value()} onChange={setValue} onChangeEnd={setEndValue} />
      <Text mt="md">Current value: {value()}</Text>
      <Text>End value: {endValue()}</Text>
    </>
  );
}

export const onChangeEnd: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 200,
};
