import { Input } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { inputOnlyControls } from '../../../shared';

const code = `
import { Input } from '@empoleon/core';

function Demo() {
  return <Input{{props}} placeholder="Input component" />;
}
`;

function Wrapper(props: any) {
  return <Input placeholder="Input component" {...props} />;
}

export const usage: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputOnlyControls,
};
