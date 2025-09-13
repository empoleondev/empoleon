import { DatePicker, DatesProvider } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { DatePicker, DatesProvider } from '@empoleon/dates';

function Demo() {
  return (
    <DatesProvider settings={{ consistentWeeks: true }}>
      <DatePicker />
    </DatesProvider>
  );
}
`;

function Demo() {
  return (
    <DatesProvider settings={{ consistentWeeks: true }}>
      <DatePicker />
    </DatesProvider>
  );
}

export const consistentWeeks: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
