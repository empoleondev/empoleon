import { JsonInput } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { inputControls } from '../../../shared';

const code = `
import { JsonInput } from '@empoleon/core';


function Demo() {
  return (
    <JsonInput
      {{props}}
      placeholder="Input placeholder"
    />
  );
}
`;

function Wrapper(props: any) {
  return <JsonInput {...props} placeholder="Input placeholder" />;
}

export const configurator: EmpoleonDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
