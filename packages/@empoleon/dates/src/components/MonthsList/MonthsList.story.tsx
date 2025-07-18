import dayjs from 'dayjs';
import { MonthsList } from './MonthsList';
import { createSignal, For } from 'solid-js';

export default { title: 'MonthsList' };

export function Usage() {
  return (
    <div style={{ padding: '40px', width: '320px' }}>
      <MonthsList year="2022-01-01" />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px', width: '320px' }}>
      <MonthsList year="2022-01-01" unstyled />
    </div>
  );
}

export function MinDate() {
  return (
    <div style={{ padding: '40px', width: '320px' }}>
      <MonthsList year="2022-01-01" minDate="2022-05-01" />
    </div>
  );
}

export function MaxDate() {
  return (
    <div style={{ padding: '40px', width: '320px' }}>
      <MonthsList year="2022-01-01" maxDate="2022-10-01" />
    </div>
  );
}

export function WithSelection() {
  const [selected, setSelected] = createSignal<string>(dayjs().format('YYYY-MM-DD'));

  return (
    <div style={{ padding: '40px', width: '320px' }}>
      <MonthsList
        year={dayjs().format('YYYY-MM-DD')}
        getMonthControlProps={(month) => ({
          selected: dayjs(month).isSame(selected(), 'month'),
          onClick: () => setSelected(month),
        })}
      />
    </div>
  );
}

export function WithRange() {
  return (
    <div style={{ padding: '40px', width: '320px' }}>
      <MonthsList year="2022-01-01" getMonthControlProps={() => ({ inRange: true })} />
      <MonthsList
        year="2022-01-01"
        getMonthControlProps={() => ({ firstInRange: true, selected: true })}
      />
      <MonthsList
        year="2022-01-01"
        getMonthControlProps={() => ({ lastInRange: true, selected: true })}
      />
    </div>
  );
}

export function Sizes() {
 const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

 return (
   <div style={{ padding: '40px' }}>
     <For each={sizes}>
       {(size) => (
         <MonthsList
           year={dayjs().format('YYYY-MM-DD')}
           size={size}
           getMonthControlProps={() => ({ selected: true })}
           mt="xl"
         />
       )}
     </For>
   </div>
 );
}
