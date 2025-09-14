import { Slider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Wrapper(props: any) {
  return <Slider {...props} defaultValue={20} />;
}

const code = `
import { Slider } from '@empoleon/core';

function Demo() {
  return <Slider{{props}} defaultValue={20} />;
}
`;

export const thumbSize: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  maxWidth: 400,
  centered: true,
  controls: [
    { prop: 'thumbSize', type: 'number', min: 16, max: 32, initialValue: 14, libraryValue: null },
  ],
};
