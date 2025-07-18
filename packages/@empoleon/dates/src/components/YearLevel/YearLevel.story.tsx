import dayjs from 'dayjs';
import { YearLevel } from './YearLevel';
import { createSignal, For } from 'solid-js';

export default { title: 'YearLevel' };

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <YearLevel year="2022-04-11" />
    </div>
  );
}

export function MinDate() {
  return (
    <div style={{ padding: '40px', width: '320px' }}>
      <YearLevel year="2022-02-01" minDate="2022-05-01" />
    </div>
  );
}

export function MaxDate() {
  return (
    <div style={{ padding: '40px', width: '320px' }}>
      <YearLevel year="2022-02-01" maxDate="2022-10-01" />
    </div>
  );
}

export function WithSelection() {
  const [selected, setSelected] = createSignal<string>(dayjs().format('YYYY-MM-DD'));

  return (
    <div style={{ padding: '40px', width: '320px' }}>
      <YearLevel
        year={dayjs().format('YYYY-MM-DD')}
        getMonthControlProps={(month) => ({
          selected: dayjs(month).isSame(selected(), 'month'),
          onClick: () => setSelected(month),
        })}
      />
    </div>
  );
}

export function Sizes() {
  const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return (
    <div style={{ padding: '40px' }}>
      <For each={sizeOptions}>
        {(size) => <YearLevel year={dayjs().format('YYYY-MM-DD')} size={size} mt="xl" />}
      </For>
    </div>
  );
}
