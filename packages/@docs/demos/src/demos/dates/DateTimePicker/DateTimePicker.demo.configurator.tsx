import { DateTimePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';
import { inputControls } from '../../../shared';

const code = `
import { DateTimePicker } from '@empoleon/dates';


function Demo() {
  return (
    <DateTimePicker
      {{props}}
      placeholder="Input placeholder"
    />
  );
}
`;

function Wrapper(props: any) {
  return <DateTimePicker {...props} placeholder="Input placeholder" />;
}

export const configurator: MantineDemo = {
  type: 'configurator',
  component: Wrapper,
  code,
  centered: true,
  maxWidth: 400,
  controls: inputControls,
};
