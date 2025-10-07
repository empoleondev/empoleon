import dayjs from 'dayjs';
import { createSignal, For, JSX } from 'solid-js';
import { Code, EmpoleonProvider, Indicator } from '@empoleon/core';
import { Month, MonthProps } from './Month';

export default {
  title: 'Month',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

function Wrapper(props: Partial<MonthProps>) {
  return (
    <div style={{ padding: '40px' }}>
      <Code>{dayjs(props.month || '2022-04-01').format('MMMM YYYY')}</Code>
      <Month month="2022-04-01" mt="xl" {...props} />
    </div>
  );
}

export function Usage() {
  return <Wrapper />;
}

export function CustomWeekendDays() {
  return <Wrapper weekendDays={[3, 4]} />;
}

export function Selected() {
  const [selected, setSelected] = createSignal<string | null>(null);
  return (
    <Wrapper
      getDayProps={(date) => ({
        selected: dayjs(date).isSame(selected(), 'date'),
        onClick: () => setSelected(date),
      })}
    />
  );
}

export function Range() {
  return (
    <Wrapper
      getDayProps={(date) => ({
        selected:
          dayjs(date).isSame('2022-04-09', 'date') || dayjs(date).isSame('2022-04-15', 'date'),
        firstInRange: dayjs(date).isSame('2022-04-09', 'date'),
        inRange:
          dayjs(date).isAfter('2022-04-09', 'date') && dayjs(date).isBefore('2022-04-15', 'date'),
        lastInRange: dayjs(date).isSame('2022-04-15', 'date'),
      })}
    />
  );
}

export function CustomDayOfWeek() {
  return <Wrapper firstDayOfWeek={6} />;
}

export function ExcludeDate() {
  return <Wrapper excludeDate={(date) => dayjs(date).day() === 0} />;
}

export function MinMaxDate() {
  return <Wrapper minDate="2022-04-10" maxDate="2022-04-22" />;
}

export function RenderDay() {
  return (
    <Wrapper
      renderDay={(date) => {
        const day = dayjs(date).date();
        return (
          <Indicator size={6} color="red" offset={-3} disabled={day !== 16}>
            <div>{day}</div>
          </Indicator>
        );
      }}
    />
  );
}

export function HideOutsideDates() {
  return <Wrapper hideOutsideDates />;
}

export function HideWeekdays() {
  return <Wrapper hideWeekdays />;
}

export function Static() {
  return <Wrapper static />;
}

export function Unstyled() {
  return <Wrapper unstyled />;
}

export function Sizes() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return <For each={sizes}>{(size) => <Wrapper size={size} />}</For>;
}

export function withWeekNumbers() {
  return <Wrapper withWeekNumbers />;
}
