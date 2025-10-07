import { createSignal } from 'solid-js';
import { ColorPicker, DEFAULT_THEME, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { createSignal } from 'solid-js';
import { DEFAULT_THEME, ColorPicker, Text } from '@empoleon/core';

function Demo() {
  const [value, onChange] = createSignal('#fff');

  return (
    <>
      <ColorPicker
        format="hex"
        value={value()}
        onChange={onChange}
        withPicker={false}
        fullWidth
        swatches={[
          ...DEFAULT_THEME.colors.red.slice(0, 7),
          ...DEFAULT_THEME.colors.green.slice(0, 7),
          ...DEFAULT_THEME.colors.blue.slice(0, 7),
        ]}
      />

      <Text>{value()}</Text>
    </>
  );
}
`;

function Demo() {
  const [value, onChange] = createSignal('#fff');

  return (
    <>
      <ColorPicker
        format="hex"
        value={value()}
        onChange={onChange}
        withPicker={false}
        fullWidth
        swatches={[
          ...DEFAULT_THEME.colors.red.slice(0, 7),
          ...DEFAULT_THEME.colors.green.slice(0, 7),
          ...DEFAULT_THEME.colors.blue.slice(0, 7),
        ]}
      />
      <Text ta="center" mt={5}>
        {value()}
      </Text>
    </>
  );
}

export const swatchesOnly: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 220,
};
