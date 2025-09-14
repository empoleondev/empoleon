import { HueSlider, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { HueSlider, Text } from '@empoleon/core';

function Demo() {
  const [value, onChange] = useState(250);

  return (
    <>
      <Text>Hue value: {value}</Text>
      <HueSlider value={value} onChange={onChange} />
    </>
  );
}
`;

function Demo() {
  const [value, onChange] = createSignal(250);

  return (
    <>
      <Text>Hue value: {value()}</Text>
      <HueSlider value={value()} onChange={onChange} />
    </>
  );
}

export const hueSlider: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 300,
};
