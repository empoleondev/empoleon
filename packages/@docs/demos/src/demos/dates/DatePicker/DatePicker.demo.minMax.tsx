import { createSignal } from 'solid-js';
import { DatePicker } from '@empoleon/dates';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { DatePicker } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DatePicker
      value={value}
      onChange={setValue}
      defaultDate="2022-02-01"
      minDate="2022-02-10"
      maxDate="2022-02-25"
    />
  );
}
`;

function Demo() {
  const [value, setValue] = createSignal<string | null>(null);
  return (
    <DatePicker
      value={value()}
      onChange={setValue}
      defaultDate="2022-02-01"
      minDate="2022-02-10"
      maxDate="2022-02-25"
    />
  );
}

export const minMax: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
