import { IconSearch } from '@tabler/icons-solidjs';
import { createMemo, createSignal, For, JSX } from 'solid-js';
import { Button, EmpoleonProvider } from '@empoleon/core';
import { Spotlight, SpotlightActionData } from './Spotlight';
import { createSpotlight } from './spotlight.store';

const [store, actions] = createSpotlight();

export default {
  title: 'Spotlight',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const actionsData: SpotlightActionData[] = Array(100)
  .fill(0)
  .map((_, index) => ({
    label: `Action ${index}`,
    description: `Action ${index} description`,
    id: `${index}`,
  }));

export function Compound() {
  const [query, setQuery] = createSignal('');

  const filteredActions = createMemo(() =>
    actionsData.filter((action) =>
      (action.label as string).toLowerCase().includes(query().toLowerCase().trim())
    )
  );

  return (
    <div style={{ padding: '40px' }}>
      <Spotlight.Root
        store={store}
        query={query()}
        onQueryChange={setQuery}
        onSpotlightOpen={() => console.log('open')}
        onSpotlightClose={() => console.log('close')}
        clearQueryOnClose
        scrollable
      >
        <Spotlight.Search
          placeholder="Search something..."
          leftSection={<IconSearch stroke="1.5" size={20} />}
        />

        <Spotlight.ActionsList>
          <For each={filteredActions()}>
            {(action) => (
              <Spotlight.Action
                onClick={() => console.log(`action ${action.label}`)}
                label={action.label}
                description={action.description}
                keywords={action.keywords}
              />
            )}
          </For>
          {filteredActions().length === 0 && <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
        </Spotlight.ActionsList>

        {/* <Spotlight.Footer>This is footer</Spotlight.Footer> */}
      </Spotlight.Root>

      <Button onClick={actions.open}>Open spotlight</Button>
    </div>
  );
}

export function Default() {
  return (
    <div style={{ padding: '40px' }}>
      <Spotlight
        store={store}
        actions={[
          {
            group: 'test',
            actions: [
              { id: '4', label: 'Home', description: 'Home page', keywords: 'test' },
              { id: '5', label: 'About', description: 'About me', keywords: 'ng' },
              { id: '6', label: 'Contact', description: 'Contact me', keywords: 'react' },
            ],
          },
          ...actionsData,
        ]}
        highlightQuery
        scrollable
        clearQueryOnClose
        limit={20}
        searchProps={{
          placeholder: 'Search actions',
          leftSection: <IconSearch stroke="1.5" size={20} />,
        }}
      />
      <Button onClick={actions.open}>Open spotlight</Button>
    </div>
  );
}

export function NotScrollable() {
  return (
    <div style={{ padding: '40px' }}>
      <Spotlight
        store={store}
        actions={[
          { id: '1', label: 'Home', description: 'Home page', keywords: 'test' },
          { id: '2', label: 'About', description: 'About me', keywords: 'ng' },
          { id: '3', label: 'Contact', description: 'Contact me', keywords: 'react' },
        ]}
        // Scrollable
        nothingFound="Nothing found"
        highlightQuery
        clearQueryOnClose
        limit={20}
        searchProps={{
          placeholder: 'Search actions',
          leftSection: <IconSearch stroke="1.5" size={20} />,
        }}
      />
      <Button onClick={actions.open}>Open spotlight</Button>
    </div>
  );
}
