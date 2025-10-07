import { Progress } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Progress } from '@empoleon/core';

function Demo() {
  return <Progress{{props}} />;
}
`;

function Demo(props: any) {
  return <Progress {...props} />;
}

export const kitchenSink: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  centered: true,
  maxWidth: 400,
  controls: [
    {
      prop: 'value',
      type: 'number',
      initialValue: 50,
      max: 100,
      min: 0,
      step: 5,
      libraryValue: '__',
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
      prop: 'striped',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'animated',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'autoContrast',
      type: 'boolean',
      initialValue: false,
      libraryValue: false,
    },
    {
      prop: 'transitionDuration',
      type: 'number',
      initialValue: 0,
      max: 1000,
      min: 0,
      step: 100,
      libraryValue: 0,
    },
  ],
};
