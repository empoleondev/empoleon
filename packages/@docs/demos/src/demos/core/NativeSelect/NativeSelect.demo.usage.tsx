import { NativeSelect } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
import { inputControls } from '../../../shared';

const code = `
import { NativeSelect } from '@empoleon/core';

function Demo() {
  return <NativeSelect{{props}} data={['React', 'Angular', 'Vue']} />;
}
`;

function Wrapper(props: any) {
  return <NativeSelect {...props} data={['React', 'Angular', 'Vue']} />;
}

export const usage: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
