import { Slider } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

function Wrapper(props: any) {
  return (
    <Slider
      defaultValue={40}
      marks={[
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
      ]}
      {...props}
    />
  );
}

const code = `
import { Slider } from '@empoleon/core';


function Demo() {
  return (
    <Slider
      {{props}}
      defaultValue={40}
      marks={[
        { value: 20, label: '20%' },
        { value: 50, label: '50%' },
        { value: 80, label: '80%' },
      ]}
    />
  );
}
`;

export const configurator: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 400,
  controls: [
    { prop: 'color', type: 'color', initialValue: 'blue', libraryValue: '__none__' },
    { prop: 'size', type: 'size', initialValue: 'md', libraryValue: 'md' },
    { prop: 'radius', type: 'size', initialValue: 'xl', libraryValue: 'xl' },
    { prop: 'showLabelOnHover', type: 'boolean', initialValue: true, libraryValue: true },
    { prop: 'labelAlwaysOn', type: 'boolean', initialValue: false, libraryValue: false },
  ],
};
