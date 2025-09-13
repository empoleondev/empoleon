import { TimeInput } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TimeInput } from '@empoleon/dates';

function Demo() {
  return <TimeInput disabled />;
}
`;

function Demo() {
  return <TimeInput disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 340,
  component: Demo,
  code,
};
