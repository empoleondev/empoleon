import { Kbd } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { Kbd } from '@empoleon/core';

function Demo() {
  return <Kbd{{props}}>Shift</Kbd>;
}
`;

function Wrapper(props: any) {
  return <Kbd {...props}>Shift</Kbd>;
}

export const size: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  controls: [{ type: 'size', prop: 'size', initialValue: 'sm', libraryValue: 'sm' }],
};
