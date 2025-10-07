import { createSignal } from 'solid-js';
import { HueSlider, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal } from 'solid-js';
import { HueSlider, Text } from '@empoleon/core';

function Demo() {
  const [value, onChange] = createSignal(250);

  return (
    <>
      <Text>Hue value: {value()}</Text>
      <HueSlider value={value()} onChange={onChange} />
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
