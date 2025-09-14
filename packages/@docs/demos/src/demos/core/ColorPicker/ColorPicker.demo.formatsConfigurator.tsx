import { ColorPicker, ColorPickerProps, Stack, Text } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

function Wrapper(props: ColorPickerProps) {
  const [value, onChange] = createSignal('#C5D899');

  return (
    <Stack align="center">
      <ColorPicker value={value()} onChange={onChange} {...props} />
      <Text>{value()}</Text>
    </Stack>
  );
}

const code = `
import { ColorPicker } from '@empoleon/core';

function Demo() {
  return <ColorPicker{{props}} />;
}
`;

export const formatsConfigurator: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  controls: [
    {
      prop: 'format',
      type: 'select',
      initialValue: 'hex',
      libraryValue: 'hex',
      data: [
        { value: 'hex', label: 'HEX' },
        { value: 'hexa', label: 'HEXA' },
        { value: 'rgb', label: 'RGB' },
        { value: 'rgba', label: 'RGBA' },
        { value: 'hsl', label: 'HSL' },
        { value: 'hsla', label: 'HSLA' },
      ],
    },
  ],
};
