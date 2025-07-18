import { For } from 'solid-js';
import { MonthLevelGroup } from './MonthLevelGroup';

export default { title: 'MonthLevelGroup' };

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <div>1 month</div>
      <MonthLevelGroup month="2022-04-11" mb={50} mt="xs" />

      <div>2 months</div>
      <MonthLevelGroup numberOfColumns={2} month="2022-04-11" mb={50} mt="xs" />

      <div>3 months</div>
      <MonthLevelGroup numberOfColumns={3} month="2022-04-11" mb={50} mt="xs" />
    </div>
  );
}

export function Sizes() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return (
    <div style={{ padding: '40px' }}>
      <For each={sizes}>
        {(size) => (
          <MonthLevelGroup numberOfColumns={3} size={size} mt="xl" month="2022-04-11" />
        )}
      </For>
    </div>
  );
}
