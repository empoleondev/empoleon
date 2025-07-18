import { For } from 'solid-js';
import { DatesProvider } from '../DatesProvider';
import { Calendar } from './Calendar';

export default { title: 'Calendar' };

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <Calendar />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px' }}>
      <Calendar unstyled />
    </div>
  );
}

export function ConsistentWeeks() {
  return (
    <div style={{ padding: '40px' }}>
      <DatesProvider settings={{ consistentWeeks: true }}>
        <Calendar />
      </DatesProvider>
    </div>
  );
}

export function MaxLevel() {
  return (
    <div style={{ padding: '40px' }}>
      <Calendar maxLevel="year" />
    </div>
  );
}

export function MinLevel() {
  return (
    <div style={{ padding: '40px' }}>
      <Calendar minLevel="year" />
    </div>
  );
}

export function NumberOfColumns() {
  return (
    <div style={{ padding: '40px' }}>
      <div>1 column</div>
      <Calendar mb={50} mt="xs" />

      <div>2 columns</div>
      <Calendar numberOfColumns={2} columnsToScroll={2} mb={50} mt="xs" />

      <div>3 columns</div>
      <Calendar numberOfColumns={3} mb={50} mt="xs" />
    </div>
  );
}

export function InitialLevelYear() {
  return (
    <div style={{ padding: '40px' }}>
      <Calendar defaultLevel="year" />
    </div>
  );
}

export function InitialLevelDecade() {
  return (
    <div style={{ padding: '40px' }}>
      <Calendar defaultLevel="decade" />
    </div>
  );
}

export function Sizes() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return (
    <div style={{ padding: '40px' }}>
      <For each={sizes}>
        {(size) => <Calendar size={size} mt="xl" />}
      </For>
    </div>
  );
}
