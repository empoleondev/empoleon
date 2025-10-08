import { IconHeart, IconMoon, IconSun } from '@tabler/icons-solidjs';
import { createEffect, createSignal } from 'solid-js';
import { Rating, RatingProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Rating } from '@empoleon/core';

function Demo() {
  return <Rating defaultValue={2}{{props}} />
}
`;

function Demo(
  props: RatingProps & {
    symbolType?: string;
  }
) {
  const [value, setValue] = createSignal(props.value ?? props.defaultValue ?? 0);

  createEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  });

  const handleChange = (newValue: number) => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  const getEmptySymbol = () => {
    const symbolProps = {
      style: { width: '100%', height: '100%' },
      stroke: '1.5',
    };

    switch (props.symbolType) {
      case 'heart':
        return () => <IconHeart {...symbolProps} />;
      case 'sun':
        return () => <IconSun {...symbolProps} />;
      case 'moon':
        return () => <IconMoon {...symbolProps} />;
      default:
        return undefined;
    }
  };

  const getFullSymbol = () => {
    const symbolProps = {
      style: { width: '100%', height: '100%' },
      stroke: '1.5',
      fill: 'currentColor',
    };

    switch (props.symbolType) {
      case 'heart':
        return () => <IconHeart {...symbolProps} />;
      case 'sun':
        return () => <IconSun {...symbolProps} />;
      case 'moon':
        return () => <IconMoon {...symbolProps} />;
      default:
        return undefined;
    }
  };

  return (
    <Rating
      {...props}
      value={value()}
      onChange={handleChange}
      emptySymbol={getEmptySymbol()}
      fullSymbol={getFullSymbol()}
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
      initialValue: 'yellow',
      libraryValue: 'yellow',
    },
    {
      prop: 'size',
      type: 'size',
      initialValue: 'md',
      libraryValue: 'md',
    },
    {
      prop: 'count',
      type: 'number',
      initialValue: 5,
      libraryValue: 5,
      min: 1,
      max: 10,
    },
    {
      prop: 'fractions',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      min: 1,
      max: 4,
      step: 1,
    },
    {
      prop: 'value',
      type: 'number',
      initialValue: 0,
      libraryValue: 0,
      min: 0,
      max: 5,
      step: 0.5,
    },
    {
      prop: 'highlightSelectedOnly',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'readOnly',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
  ],
};
