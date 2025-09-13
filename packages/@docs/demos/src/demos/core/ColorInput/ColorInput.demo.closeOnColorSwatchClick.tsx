import { ColorInput, DEFAULT_THEME } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { ColorInput, DEFAULT_THEME } from '@empoleon/core';

function Demo() {
  return (
    <ColorInput
      closeOnColorSwatchClick
      label="Dropdown is closed when color swatch is clicked"
      placeholder="Click color swatch"
      swatches={[
        ...DEFAULT_THEME.colors.red,
        ...DEFAULT_THEME.colors.green,
        ...DEFAULT_THEME.colors.blue,
      ]}
    />
  );
}
`;

function Demo() {
  return (
    <ColorInput
      closeOnColorSwatchClick
      label="Dropdown is closed when color swatch is clicked"
      placeholder="Click color swatch"
      swatches={[
        ...DEFAULT_THEME.colors.red,
        ...DEFAULT_THEME.colors.green,
        ...DEFAULT_THEME.colors.blue,
      ]}
    />
  );
}

export const closeOnColorSwatchClick: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
