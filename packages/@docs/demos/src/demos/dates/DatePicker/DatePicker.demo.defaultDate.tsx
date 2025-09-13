import { DatePicker } from '@empoleon/dates';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { DatePicker } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = useState<string | null>(null);
  return <DatePicker defaultDate="2015-02-01" value={value} onChange={setValue} />;
}
`;

function Demo() {
  const [value, setValue] = createSignal<string | null>(null);
  return <DatePicker defaultDate="2015-02-01" value={value()} onChange={setValue} />;
}

export const defaultDate: MantineDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
