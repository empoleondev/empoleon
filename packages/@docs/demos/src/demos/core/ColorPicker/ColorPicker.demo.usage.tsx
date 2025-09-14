import { ColorPicker, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { ColorPicker, Text } from '@empoleon/core';

function Demo() {
  const [value, onChange] = useState('rgba(47, 119, 150, 0.7)');

  return (
    <>
      <ColorPicker format="rgba" value={value} onChange={onChange} />
      <Text>{value}</Text>
    </>
  );
}
`;

function Demo() {
  const [value, onChange] = createSignal('rgba(47, 119, 150, 0.7)');

  return (
    <>
      <ColorPicker format="rgba" value={value()} onChange={onChange} />
      <Text mt="md">{value()}</Text>
    </>
  );
}

export const usage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
