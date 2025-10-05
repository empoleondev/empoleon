import { SemiCircleProgress } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { SemiCircleProgress } from '@empoleon/core';

function Demo() {
  return (
    <SemiCircleProgress
      {{props}}
      label="Label"
    />
  );
}
`;

function Wrapper(props: any) {
  return <SemiCircleProgress label="Label" {...props} />;
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [
    {
      prop: 'value',
      type: 'number',
      min: 0,
      max: 100,
      initialValue: 40,
      libraryValue: null,
    },
    {
      prop: 'size',
      type: 'number',
      min: 120,
      max: 450,
      initialValue: 200,
      libraryValue: 200,
    },
    {
      prop: 'thickness',
      type: 'number',
      min: 1,
      max: 20,
      initialValue: 12,
      libraryValue: 12,
    },
    {
      prop: 'orientation',
      type: 'segmented',
      initialValue: 'up',
      libraryValue: 'up',
      data: [
        { label: 'Up', value: 'up' },
        { label: 'Down', value: 'down' },
      ],
    },
    {
      prop: 'fillDirection',
      type: 'segmented',
      initialValue: 'left-to-right',
      libraryValue: 'left-to-right',
      data: [
        { label: 'Left to Right', value: 'left-to-right' },
        { label: 'Right to Left', value: 'right-to-left' },
      ],
    },
    {
      prop: 'filledSegmentColor',
      type: 'color',
      initialValue: 'blue',
      libraryValue: null,
    },
    {
      prop: 'emptySegmentColor',
      type: 'color',
      initialValue: 'gray',
      libraryValue: null,
    },
    {
      prop: 'transitionDuration',
      type: 'number',
      min: 0,
      max: 2000,
      initialValue: 0,
      libraryValue: 0,
    },
    {
      prop: 'labelPosition',
      type: 'segmented',
      initialValue: 'bottom',
      libraryValue: 'bottom',
      data: [
        { label: 'Bottom', value: 'bottom' },
        { label: 'Center', value: 'center' },
      ],
    },
    {
      prop: 'label',
      type: 'string',
      initialValue: 'Label',
      libraryValue: null,
    },
  ],
};
