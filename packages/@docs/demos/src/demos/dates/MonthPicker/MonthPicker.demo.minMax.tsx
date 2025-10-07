import { createSignal } from 'solid-js';
import { MonthPicker } from '@empoleon/dates';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { MonthPicker } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <MonthPicker
      value={value}
      onChange={setValue}
      defaultDate="2022-02-01"
      minDate="2022-02-01"
      maxDate="2022-09-01"
    />
  );
}
`;

function Demo() {
  const [value, setValue] = createSignal<string | null>(null);
  return (
    <MonthPicker
      value={value()}
      onChange={setValue}
      defaultDate="2022-02-01"
      minDate="2022-02-01"
      maxDate="2022-09-01"
    />
  );
}

export const minMax: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
