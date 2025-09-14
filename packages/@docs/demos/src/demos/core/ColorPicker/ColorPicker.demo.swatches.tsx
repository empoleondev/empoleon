import { ColorPicker, DEFAULT_THEME, Stack } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { ColorPicker } from '@empoleon/core';

function Demo() {
  return (
    <ColorPicker
      format="hex"
      swatches={[${Object.keys(DEFAULT_THEME.colors)
        .map((color) => `'${DEFAULT_THEME.colors[color][6]}'`)
        .join(', ')}]}
    />
  );
}
`;

function Demo() {
  return (
    <Stack align="center">
      <ColorPicker
        format="hex"
        defaultValue="rgba(50, 151, 194, 1)"
        swatches={Object.keys(DEFAULT_THEME.colors).map((color) => DEFAULT_THEME.colors[color][6])}
      />
    </Stack>
  );
}

export const swatches: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
