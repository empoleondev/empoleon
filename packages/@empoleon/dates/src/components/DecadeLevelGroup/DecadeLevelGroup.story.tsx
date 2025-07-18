import { For } from 'solid-js';
import { DecadeLevelGroup } from './DecadeLevelGroup';

export default { title: 'DecadeLevelGroup' };

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <div>1 column</div>
      <DecadeLevelGroup decade="2022-04-11" mb={50} mt="xs" />

      <div>2 columns</div>
      <DecadeLevelGroup numberOfColumns={2} decade="2022-04-11" mb={50} mt="xs" />

      <div>3 columns</div>
      <DecadeLevelGroup numberOfColumns={3} decade="2022-04-11" mb={50} mt="xs" />
    </div>
  );
}

export function Sizes() {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

  return (
    <div style={{ padding: '40px' }}>
      <For each={sizes}>
        {(size) => (
          <DecadeLevelGroup numberOfColumns={3} size={size} mt="xl" decade="2022-04-11" />
        )}
      </For>
    </div>
  );
}
