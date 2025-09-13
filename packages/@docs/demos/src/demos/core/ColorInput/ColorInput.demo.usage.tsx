import { ColorInput } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
import { inputControls } from '../../../shared';

const code = `
import { ColorInput } from '@empoleon/core';


function Demo() {
  return (
    <ColorInput
      {{props}}
      placeholder="Input placeholder"
    />
  );
}
`;

function Wrapper(props: any) {
  return <ColorInput {...props} placeholder="Input placeholder" />;
}

export const usage: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
