import { DateTimePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { DateTimePicker } from '@empoleon/dates';

function Demo() {
  return (
    <DateTimePicker
      label="Pick date and time"
      placeholder="Pick date and time"
      timePickerProps={{
        withDropdown: true,
        popoverProps: { withinPortal: false },
        format: '12h',
      }}
    />
  );
}
`;

function Demo() {
  return (
    <DateTimePicker
      label="Pick date and time"
      placeholder="Pick date and time"
      timePickerProps={{
        withDropdown: true,
        popoverProps: { withinPortal: false },
        format: '12h',
      }}
    />
  );
}

export const timePickerProps: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
