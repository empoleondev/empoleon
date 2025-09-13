import { DateInput } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { DateInput } from '@empoleon/dates';

function Demo() {
  return <DateInput label="Disabled" placeholder="Date input" disabled />;
}
`;

function Demo() {
  return <DateInput label="Disabled" placeholder="Date input" disabled />;
}

export const disabled: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
