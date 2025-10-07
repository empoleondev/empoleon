import { IconSearch } from '@tabler/icons-solidjs';
import { createSignal, For } from 'solid-js';
import { Button } from '@empoleon/core';
import { createSpotlight, Spotlight } from '@empoleon/spotlight';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { Spotlight, spotlight } from '@empoleon/spotlight';
import { Button } from '@empoleon/core';
import { IconSearch } from '@tabler/icons-solidjs';

const data = ['Home', 'About us', 'Contacts', 'Blog', 'Careers', 'Terms of service'];

function Demo() {
  const [query, setQuery] = useState('');

  const items = data
    .filter((item) => item.toLowerCase().includes(query.toLowerCase().trim()))
    .map((item) => <Spotlight.Action label={item} />);

  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>

      <Spotlight.Root query={query} onQueryChange={setQuery}>
        <Spotlight.Search placeholder="Search..." leftSection={<IconSearch stroke='1.5' />} />
        <Spotlight.ActionsList>
          {items.length > 0 ? items : <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}
`;

const data = ['Home', 'About us', 'Contacts', 'Blog', 'Careers', 'Terms of service'];

function Demo() {
  const [store, spotlight] = createSpotlight();
  const [query, setQuery] = createSignal('');

  const filteredItems = () =>
    data.filter((item) => item.toLowerCase().includes(query().toLowerCase().trim()));

  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>

      <Spotlight.Root store={store} query={query()} onQueryChange={setQuery} shortcut={null}>
        <Spotlight.Search placeholder="Search..." leftSection={<IconSearch stroke="1.5" />} />
        <Spotlight.ActionsList>
          <For
            each={filteredItems()}
            fallback={<Spotlight.Empty>Nothing found...</Spotlight.Empty>}
          >
            {(item) => <Spotlight.Action label={item} />}
          </For>
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}

export const compound: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
