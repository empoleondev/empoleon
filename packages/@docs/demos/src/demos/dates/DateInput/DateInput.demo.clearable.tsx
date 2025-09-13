import dayjs from 'dayjs';
import { DateInput } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import dayjs from 'dayjs';
import { DateInput } from '@empoleon/dates';

function Demo() {
  return (
    <DateInput
      clearable
      defaultValue={dayjs().format('YYYY-MM-DD')}
      label="Date input"
      placeholder="Date input"
    />
  );
}
`;

function Demo() {
  return (
    <DateInput
      clearable
      defaultValue={dayjs().format('YYYY-MM-DD')}
      label="Date input"
      placeholder="Date input"
    />
  );
}

export const clearable: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
