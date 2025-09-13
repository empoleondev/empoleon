import { TimePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TimePicker } from '@empoleon/dates';

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      popoverProps={{
        position: 'top-start',
        middlewares: { flip: false, shift: false },
      }}
    />
  );
}
`;

function Demo() {
  return (
    <TimePicker
      label="Enter time"
      withDropdown
      popoverProps={{
        position: 'top-start',
        middlewares: { flip: false, shift: false },
      }}
    />
  );
}

export const dropdownPosition: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
