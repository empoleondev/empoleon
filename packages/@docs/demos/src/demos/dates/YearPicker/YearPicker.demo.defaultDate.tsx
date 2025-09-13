import { YearPicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { YearPicker } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <YearPicker defaultDate="2040-02-01" value={value} onChange={setValue} />;
}
`;

function Demo() {
  const [value, setValue] = createSignal<string | null>(null);
  return <YearPicker defaultDate="2040-02-01" value={value()} onChange={setValue} />;
}

export const defaultDate: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
