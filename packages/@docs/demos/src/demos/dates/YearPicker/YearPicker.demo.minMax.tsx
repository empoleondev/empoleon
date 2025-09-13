import { YearPicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { YearPicker } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <YearPicker
      value={value}
      onChange={setValue}
      minDate="2021-02-01"
      maxDate="2028-02-01"
    />
  );
}
`;

function Demo() {
  const [value, setValue] = createSignal<string | null>(null);
  return <YearPicker value={value()} onChange={setValue} minDate="2021-02-01" maxDate="2028-02-01" />;
}

export const minMax: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
