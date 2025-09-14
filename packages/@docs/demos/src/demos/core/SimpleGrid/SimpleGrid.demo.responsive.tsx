import { SimpleGrid } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { defaultItems, GridItem } from './_demo-item';
import { For } from 'solid-js';

const code = `
import { SimpleGrid } from '@empoleon/core';

function Demo() {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 5 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </SimpleGrid>
  );
}
`;

function Demo() {
  return (
    <SimpleGrid
      cols={{ base: 1, sm: 2, lg: 5 }}
      spacing={{ base: 10, sm: 'xl' }}
      verticalSpacing={{ base: 'md', sm: 'xl' }}
    >
      <For each={defaultItems}>
        {(_, index) => (
          <GridItem>{index() + 1}</GridItem>
        )}
      </For>
    </SimpleGrid>
  );
}

export const responsive: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
