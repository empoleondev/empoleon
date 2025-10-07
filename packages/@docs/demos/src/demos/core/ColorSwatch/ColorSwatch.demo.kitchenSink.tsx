import { ColorSwatch, ColorSwatchProps, getSize } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const SIZE_VALUES = { xs: 16, sm: 20, md: 28, lg: 36, xl: 48 };

const code = `
import { ColorSwatch } from '@empoleon/core';

function Demo() {
  return (
    <ColorSwatch{{props}} />
  );
}
`;

function Demo(props: ColorSwatchProps) {
  return (
    <ColorSwatch
      {...props}
      size={getSize(SIZE_VALUES[props.size as keyof typeof SIZE_VALUES])}
      radius={props.radius}
    />
  );
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  controls: [
    {
      prop: 'color',
      type: 'color',
      initialValue: 'gray',
      libraryValue: 'gray',
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'radius',
      type: 'size',
      initialValue: 'sm',
      libraryValue: 'sm',
    },
    {
      prop: 'withShadow',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
  ],
};
