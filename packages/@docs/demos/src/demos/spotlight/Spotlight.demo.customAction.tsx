/* eslint-disable no-console */
import { IconSearch } from '@tabler/icons-solidjs';
import { Badge, Button, Center, Group, Text } from '@empoleon/core';
import { createSpotlight, Spotlight } from '@empoleon/spotlight';
import { MantineDemo } from '@empoleonx/demo';
import { createMemo, createSignal } from 'solid-js';

const code = `
import { useState } from 'react';
import { Spotlight, spotlight } from '@empoleon/spotlight';
import { Badge, Button, Center, Group, Text } from '@empoleon/core';
import { IconSearch } from '@tabler/icons-solidjs';

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    title: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
    new: true,
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    title: 'Carol Miller',
    description: 'One of the richest people on Earth',
    new: false,
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    title: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
    new: false,
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    title: 'Spongebob Squarepants',
    description: 'Not just a sponge',
    new: false,
  },
];

function Demo() {
  const [query, setQuery] = useState('');

  const items = data
  .filter((item) => item.title.toLowerCase().includes(query.toLowerCase().trim()))
  .map((item) => (
    <Spotlight.Action key={item.title} onClick={() => console.log(item)}>
      <Group wrap="nowrap" w="100%">
        {item.image && (
          <Center>
            <img src={item.image} alt={item.title} width={50} height={50} />
          </Center>
        )}

        <div style={{ flex: 1 }}>
          <Text>{item.title}</Text>

          {item.description && (
            <Text opacity={0.6} size="xs">
              {item.description}
            </Text>
          )}
        </div>

        {item.new && <Badge variant="default">new</Badge>}
      </Group>
    </Spotlight.Action>
  ));

  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>

      <Spotlight.Root query={query} onQueryChange={setQuery}>
        <Spotlight.Search placeholder="Search..." leftSection={<IconSearch stroke={1.5} />} />
        <Spotlight.ActionsList>
          {items.length > 0 ? items : <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}
`;

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    title: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking, though has no sense of taste',
    new: true,
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    title: 'Carol Miller',
    description: 'One of the richest people on Earth',
    new: false,
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    title: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
    new: false,
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    title: 'Spongebob Squarepants',
    description: 'Not just a sponge',
    new: false,
  },
];

function Demo() {
  const [store, spotlight] = createSpotlight();
  const [query, setQuery] = createSignal('');

  const items = data
    .filter((item) => item.title.toLowerCase().includes(query().toLowerCase().trim()))
    .map((item) => (
      <Spotlight.Action onClick={() => console.log(item)}>
        <Group wrap="nowrap" w="100%">
          {item.image && (
            <Center>
              <img src={item.image} alt={item.title} width={50} height={50} />
            </Center>
          )}

          <div style={{ flex: 1 }}>
            <Text>{item.title}</Text>

            {item.description && (
              <Text opacity={0.6} size="xs">
                {item.description}
              </Text>
            )}
          </div>

          {item.new && <Badge variant="default">new</Badge>}
        </Group>
      </Spotlight.Action>
    ));

  return (
    <>
      <Button onClick={spotlight.open}>Open spotlight</Button>

      <Spotlight.Root store={store} query={query()} onQueryChange={setQuery} shortcut={null}>
        <Spotlight.Search placeholder="Search..." leftSection={<IconSearch stroke='1.5' />} />
        <Spotlight.ActionsList>
          {items.length > 0 ? items : <Spotlight.Empty>Nothing found...</Spotlight.Empty>}
        </Spotlight.ActionsList>
      </Spotlight.Root>
    </>
  );
}

export const customAction: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
