import { SimpleGrid, SimpleGridProps } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { defaultItems, GridItem } from './_demo-item';
import { For } from 'solid-js';

function Demo(props: SimpleGridProps) {
  return (
    <SimpleGrid {...props} id="grid-configurator">
      <For each={defaultItems}>
        {(_, index) => (
          <GridItem>{index() + 1}</GridItem>
        )}
      </For>
    </SimpleGrid>
  );
}

const code = `
import { SimpleGrid } from '@empoleon/core';

function Demo() {
  return (
    <SimpleGrid{{props}}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
    </SimpleGrid>
  )
}
`;

export const usage: EmpoleonDemo = {
  type: 'configurator',
  component: Demo,
  code,
  controls: [
    { prop: 'cols', type: 'number', initialValue: 3, min: 1, max: 6, step: 1, libraryValue: '__' },
    { prop: 'spacing', type: 'size', initialValue: 'md', libraryValue: 'md' },
    { prop: 'verticalSpacing', type: 'size', initialValue: 'md', libraryValue: 'md' },
  ],
};
