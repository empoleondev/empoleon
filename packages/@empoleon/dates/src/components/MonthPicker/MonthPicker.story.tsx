import { createSignal, For } from 'solid-js';
import { DatesRangeValue, DateStringValue } from '../../types';
import { MonthPicker } from './MonthPicker';

export default { title: 'MonthPicker' };

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <MonthPicker />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: '40px' }}>
      <MonthPicker type="multiple" />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: '40px' }}>
      <MonthPicker type="range" />
    </div>
  );
}

export function AllowDeselect() {
  return (
    <div style={{ padding: '40px' }}>
      <MonthPicker allowDeselect />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = createSignal<DateStringValue | null>(null);
  return (
    <div style={{ padding: '40px' }}>
      <MonthPicker value={value()} onChange={setValue} numberOfColumns={3} columnsToScroll={1} />
      {value()}
    </div>
  );
}

export function ControlledRange() {
  const [value, setValue] = createSignal<DatesRangeValue>([null, null]);
  return (
    <div style={{ padding: '40px' }}>
      <MonthPicker
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
      <MonthPicker
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
            {index() < value().length - 1 && ', '}
          </>
        )}
      </For>
    </div>
  );
}

export function Sizes() {
 const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

 return (
   <div style={{ padding: '40px' }}>
     <For each={sizes}>
       {(size) => (
         <MonthPicker size={size} />
       )}
     </For>
   </div>
 );
}
