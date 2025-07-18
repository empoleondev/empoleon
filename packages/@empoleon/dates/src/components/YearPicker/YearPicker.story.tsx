import { createSignal, For } from 'solid-js';
import { DatesRangeValue, DateStringValue } from '../../types';
import { YearPicker } from './YearPicker';

export default { title: 'YearPicker' };

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <YearPicker />
    </div>
  );
}

export function Multiple() {
  return (
    <div style={{ padding: '40px' }}>
      <YearPicker type="multiple" />
    </div>
  );
}

export function Range() {
  return (
    <div style={{ padding: '40px' }}>
      <YearPicker type="range" />
    </div>
  );
}

export function AllowDeselect() {
  return (
    <div style={{ padding: '40px' }}>
      <YearPicker allowDeselect />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = createSignal<DateStringValue | null>(null);
  return (
    <div style={{ padding: '40px' }}>
      <YearPicker value={value()} onChange={setValue} numberOfColumns={3} columnsToScroll={1} />
      {value()}
    </div>
  );
}

export function ControlledRange() {
  const [value, setValue] = createSignal<DatesRangeValue>([null, null]);
  return (
    <div style={{ padding: '40px' }}>
      <YearPicker
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
      <YearPicker
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
         <YearPicker size={size} />
       )}
     </For>
   </div>
 );
}
