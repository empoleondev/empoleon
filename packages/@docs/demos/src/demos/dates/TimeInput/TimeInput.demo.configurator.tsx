import { TimeInput } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';
import { inputControls } from '../../../shared';

const code = `
import { TimeInput } from '@empoleon/dates';


function Demo() {
  return (
    <TimeInput
      {{props}}
    />
  );
}
`;

function Wrapper(props: any) {
  return <TimeInput {...props} />;
}

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 340,
  controls: inputControls,
};
