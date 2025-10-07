import 'dayjs/locale/ru';

import { For, JSX } from 'solid-js';
import { EmpoleonProvider } from '@empoleon/core';
import { WeekdaysRow, WeekdaysRowProps } from './WeekdaysRow';

export default {
  title: 'WeekdaysRow',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

function Wrapper(props: WeekdaysRowProps) {
  return (
    <table>
      <thead>
        <WeekdaysRow {...props} />
      </thead>
    </table>
  );
}

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <Wrapper />
    </div>
  );
}

export function Locale() {
  return (
    <div style={{ padding: '40px' }}>
      <Wrapper locale="ru" />
    </div>
  );
}

export function DayOfWeek() {
  return (
    <div style={{ padding: '40px' }}>
      <Wrapper firstDayOfWeek={0} />
      <Wrapper firstDayOfWeek={6} />
      <Wrapper firstDayOfWeek={4} />
    </div>
  );
}

export function Sizes() {
  const sizeOptions = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return (
    <div style={{ padding: '40px' }}>
      <For each={sizeOptions}>{(size) => <Wrapper size={size} />}</For>
    </div>
  );
}
