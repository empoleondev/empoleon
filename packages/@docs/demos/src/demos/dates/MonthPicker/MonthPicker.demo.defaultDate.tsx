import { MonthPicker } from '@empoleon/dates';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { MonthPicker } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <MonthPicker defaultDate="2015-02-01" value={value} onChange={setValue} />;
}
`;

function Demo() {
  const [value, setValue] = createSignal<string | null>(null);
  return <MonthPicker defaultDate="2015-02-01" value={value()} onChange={setValue} />;
}

export const defaultDate: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
