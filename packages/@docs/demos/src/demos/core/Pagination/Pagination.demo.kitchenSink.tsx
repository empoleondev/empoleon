import { Pagination, PaginationProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, createEffect } from 'solid-js';

const code = `
import { Pagination } from '@empoleon/core';

function Demo() {
  return (
    <Pagination{{props}} />
  );
}
`;

function Demo(props: PaginationProps) {
  const [value, setValue] = createSignal(props.value || props.defaultValue || 1);

  createEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  });

  const handleChange = (page: number) => {
    setValue(page);
    props.onChange?.(page);
  };

  return (
    <Pagination
      {...props}
      value={value()}
      onChange={handleChange}
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
      prop: 'total',
      type: 'number',
      initialValue: 20,
      libraryValue: 10,
      min: 1,
      max: 100,
      step: 1,
    },
    {
      prop: 'value',
      type: 'number',
      initialValue: 10,
      libraryValue: 1,
      min: 1,
      max: 100,
      step: 1,
    },
    {
      prop: 'siblings',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      min: 0,
      max: 5,
      step: 1,
    },
    {
      prop: 'boundaries',
      type: 'number',
      initialValue: 1,
      libraryValue: 1,
      min: 0,
      max: 5,
      step: 1,
    },
    {
      prop: 'color',
      type: 'color',
      initialValue: 'blue',
      libraryValue: 'blue',
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
      prop: 'withEdges',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'withControls',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'withPages',
      type: 'boolean',
      initialValue: true,
      libraryValue: true,
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'disabled',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'hideWithOnePage',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'gap',
      type: 'select',
      initialValue: 'xs',
      libraryValue: 'xs',
      data: [
        { label: 'XS', value: 'xs' },
        { label: 'SM', value: 'sm' },
        { label: 'MD', value: 'md' },
        { label: 'LG', value: 'lg' },
        { label: 'XL', value: 'xl' },
      ],
    },
  ],
};
