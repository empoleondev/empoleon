import 'dayjs/locale/ru';

import dayjs from 'dayjs';
import { createSignal, For, JSX } from 'solid-js';
import { Button, EmpoleonProvider, Stack } from '@empoleon/core';
import { DatesRangeValue, DateStringValue } from '../../types';
import { DatePicker } from './DatePicker';

export default {
  title: 'DatePicker',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <DatePicker highlightToday />
    </div>
  );
}

export function RangedSetPartial() {
  const [value, setValue] = createSignal<[DateStringValue | null, DateStringValue | null]>([
    dayjs(new Date()).format('YYYY-MM-DD'),
    null,
  ]);

  return (
    <div style={{ padding: '40px' }}>
      <DatePicker type="range" value={value()} onChange={setValue} />
      <Button onClick={() => setValue([dayjs(new Date()).format('YYYY-MM-DD'), null])}>
        Set initial range
      </Button>
    </div>
  );
}

export function HideOutsideDates() {
  return (
    <div style={{ padding: '40px' }}>
      <DatePicker hideOutsideDates />
    </div>
  );
}

export function RangeCancelled() {
  const [value, setValue] = createSignal<[DateStringValue | null, DateStringValue | null]>([
    null,
    null,
  ]);

  const handleChange = (val: [DateStringValue | null, DateStringValue | null]) => {
    setValue(val);
  };

  const clearRange = () => {
    setValue([null, null]);
  };

  return (
    <Stack>
      <DatePicker type="range" value={value()} onChange={handleChange} allowSingleDateInRange />
      <Button onClick={clearRange}>CLEAR</Button>
    </Stack>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px' }}>
      <DatePicker unstyled />
    </div>
  );
}

export function RuLocale() {
  return (
    <div style={{ padding: '40px' }}>
      <DatePicker locale="ru" />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: '40px' }}>
      <DatePicker type="multiple" />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: '40px' }}>
      <DatePicker type="range" defaultValue={['2022-04-11', null]} />
    </div>
  );
}

export function AllowDeselect() {
  return (
    <div style={{ padding: '40px' }}>
      <DatePicker allowDeselect />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = createSignal<DateStringValue | null>(null);
  return (
    <div style={{ padding: '40px' }}>
      <DatePicker value={value()} onChange={setValue} numberOfColumns={3} columnsToScroll={1} />
      {value()}
    </div>
  );
}

export function ControlledRange() {
  const [value, setValue] = createSignal<DatesRangeValue>([null, null]);
  return (
    <div style={{ padding: '40px' }}>
      <DatePicker
        type="range"
        value={value()}
        onChange={setValue}
        numberOfColumns={3}
        columnsToScroll={1}
      />
      <For each={value()}>
        {(date, index) => (
          <>
            {date || 'ns'}
            {index() < value().length - 1 && ' – '}
          </>
        )}
      </For>
    </div>
  );
}

export function ControlledMultiple() {
  const [value, setValue] = createSignal<DateStringValue[]>([]);
  return (
    <div style={{ padding: '40px' }}>
      <DatePicker
        type="multiple"
        value={value()}
        onChange={setValue}
        numberOfColumns={3}
        columnsToScroll={1}
      />
      <For each={value()}>
        {(date, index) => (
          <>
            {date || 'ns'}
            {index() < value().length - 1 && ' – '}
          </>
        )}
      </For>
    </div>
  );
}
