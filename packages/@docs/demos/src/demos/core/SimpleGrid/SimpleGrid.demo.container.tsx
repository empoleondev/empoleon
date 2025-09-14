import { SimpleGrid } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { For } from 'solid-js';
import { defaultItems, GridItem } from './_demo-item';

const code = `
import { SimpleGrid } from '@empoleon/core';

function Demo() {
  return (
    // Wrapper div is added for demonstration purposes only,
    // it is not required in real projects
    <div style={{ resize: 'horizontal', overflow: 'hidden', maxWidth: '100%' }}>
      <SimpleGrid
        type="container"
        cols={{ base: 1, '300px': 2, '500px': 5 }}
        spacing={{ base: 10, '300px': 'xl' }}
      >
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
      </SimpleGrid>
    </div>
  );
}
`;

function Demo() {
  return (
    // Wrapper div is added for demonstration purposes only,
    // It is not required in real projects
    <div style={{ resize: 'horizontal', overflow: 'hidden', 'max-width': '100%' }}>
      <SimpleGrid
        type="container"
        cols={{ base: 1, '300px': 2, '500px': 5 }}
        spacing={{ base: 10, '300px': 'xl' }}
      >
        <For each={defaultItems}>
          {(_, index) => (
            <GridItem>{index() + 1}</GridItem>
          )}
        </For>
      </SimpleGrid>
    </div>
  );
}

export const container: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
