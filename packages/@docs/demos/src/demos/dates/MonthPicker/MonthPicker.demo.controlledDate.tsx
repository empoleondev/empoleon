import dayjs from 'dayjs';
import { MonthPicker } from '@empoleon/dates';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import dayjs from 'dayjs';
import { useState } from 'react';
import { MonthPicker } from '@empoleon/dates';

function Demo() {
  const [value, setValue] = useState<[string | null, string | null]>([null, null]);
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  const handleChange = (val: [string | null, string | null]) => {
    if (val[0] !== null && val[1] === null) {
      setDate((current) => dayjs(current).add(1, 'year').format('YYYY-MM-DD'));
    }

    setValue(val);
  };

  return (
    <MonthPicker
      date={date}
      onDateChange={setDate}
      type="range"
      value={value}
      onChange={handleChange}
    />
  );
}
`;

function Demo() {
  const [value, setValue] = createSignal<[string | null, string | null]>([null, null]);
  const [date, setDate] = createSignal(dayjs().format('YYYY-MM-DD'));

  const handleChange = (val: [string | null, string | null]) => {
    if (val[0] !== null && val[1] === null) {
      setDate((current) => dayjs(current).add(1, 'year').format('YYYY-MM-DD'));
    }

    setValue(val);
  };

  return (
    <MonthPicker
      date={date()}
      onDateChange={setDate}
      type="range"
      value={value()}
      onChange={handleChange}
    />
  );
}

export const controlledDate: EmpoleonDemo = {
  type: 'code',
  centered: true,
  component: Demo,
  code,
};
