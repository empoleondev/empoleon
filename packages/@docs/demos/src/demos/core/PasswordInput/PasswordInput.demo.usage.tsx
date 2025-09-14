import { PasswordInput } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { inputControls } from '../../../shared';

const code = `
import { PasswordInput } from '@empoleon/core';


function Demo() {
  return (
    <PasswordInput
      {{props}}
      placeholder="Input placeholder"
    />
  );
}
`;

function Wrapper(props: any) {
  return <PasswordInput {...props} placeholder="Input placeholder" />;
}

export const usage: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
