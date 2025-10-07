import { ColorInput, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { createSignal } from 'solid-js';

function Demo() {
  const [changeEndValue, setChangeEndValue] = createSignal('#FFFFFF');

  return (
    <>
      <Text mb="md">
        Change end value: <b>{changeEndValue()}</b>
      </Text>

      <ColorInput
        label="Pick color"
        placeholder="Pick color"
        defaultValue="#FFFFFF"
        onChangeEnd={setChangeEndValue}
      />
    </>
  );
}
`;

function Demo() {
  const [changeEndValue, setChangeEndValue] = createSignal('#FFFFFF');

  return (
    <>
      <Text mb="md">
        Change end value: <b>{changeEndValue()}</b>
      </Text>

      <ColorInput
        label="Pick color"
        placeholder="Pick color"
        defaultValue="#FFFFFF"
        onChangeEnd={setChangeEndValue}
      />
    </>
  );
}

export const onChangeEnd: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
