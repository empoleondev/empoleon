import { TimePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TimePicker } from '@empoleon/dates';

function Demo() {
  return (
    <>
      <TimePicker label="Enter time (24h format)" withSeconds withDropdown />
      <TimePicker label="Enter time (12h format)" withSeconds withDropdown format="12h" mt="md" />
    </>
  );
}
`;

function Demo() {
  return (
    <>
      <TimePicker label="Enter time (24h format)" withSeconds withDropdown />
      <TimePicker label="Enter time (12h format)" withSeconds withDropdown format="12h" mt="md" />
    </>
  );
}

export const withDropdown: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
