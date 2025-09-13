import { DateInput } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { DateInput } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <DateInput
      value={value}
      onChange={setValue}
      label="Date input"
      placeholder="Date input"
    />
  );
}
`;

function Demo() {
  const [value, setValue] = createSignal<string | null>(null);
  return (
    <DateInput value={value()} onChange={setValue} label="Date input" placeholder="Date input" />
  );
}

export const usage: MantineDemo = {
  type: 'code',
  centered: true,
  maxWidth: 400,
  component: Demo,
  code,
};
