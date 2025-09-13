import { FileInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
import { inputControls } from '../../../shared';

const code = `
import { FileInput } from '@empoleon/core';


function Demo() {
  return (
    <FileInput
      {{props}}
      placeholder="Input placeholder"
    />
  );
}
`;

function Wrapper(props: any) {
  return <FileInput {...props} placeholder="Input placeholder" />;
}

export const usage: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
