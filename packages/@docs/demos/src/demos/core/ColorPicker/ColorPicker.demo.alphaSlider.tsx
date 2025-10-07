import { createSignal } from 'solid-js';
import { AlphaSlider, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { AlphaSlider, Text } from '@empoleon/core';

function Demo() {
  const [value, onChange] = useState(0.55);

  return (
    <>
      <Text>Alpha value: {value}</Text>
      <AlphaSlider color="#1c7ed6" value={value} onChange={onChange} />
    </>
  );
}
`;

function Demo() {
  const [value, onChange] = createSignal(0.55);

  return (
    <>
      <Text>Alpha value: {value()}</Text>
      <AlphaSlider color="#1c7ed6" value={value()} onChange={onChange} />
    </>
  );
}

export const alphaSlider: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 300,
};
