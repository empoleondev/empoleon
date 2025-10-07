import { Anchor, Breadcrumbs } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { For } from 'solid-js';

const code = `
import { Breadcrumbs, Anchor } from '@empoleon/core';

const items = [
  { title: 'Mantine', href: '#' },
  { title: 'Mantine hooks', href: '#' },
  { title: 'use-id', href: '#' },
];

function Demo() {
  return (
    <>
      <Breadcrumbs>
        <For each={items}>
          {(item) => (
            <Anchor href={item.href}>
              {item.title}
            </Anchor>
          )}
        </For>
      </Breadcrumbs>
      <Breadcrumbs
        separator="→"
        mt="xs"
        separatorMargin="md"
        classNames={{ separator: 'mantine-rotate-rtl' }}
      >
        <For each={items}>
          {(item) => (
            <Anchor href={item.href}>
              {item.title}
            </Anchor>
          )}
        </For>
      </Breadcrumbs>
    </>
  );
}
`;

const items = [
  { title: 'Mantine', href: 'https://mantine.dev' },
  { title: 'Mantine hooks', href: '#' },
  { title: 'use-id', href: '#' },
];

function Demo() {
  return (
    <>
      <Breadcrumbs>
        <For each={items}>
          {(item) => (
            <Anchor href={item.href}>
              {item.title}
            </Anchor>
          )}
        </For>
      </Breadcrumbs>
      <Breadcrumbs
        separator="→"
        mt="xs"
        separatorMargin="md"
        classNames={{ separator: 'mantine-rotate-rtl' }}
      >
        <For each={items}>
          {(item) => (
            <Anchor href={item.href}>
              {item.title}
            </Anchor>
          )}
        </For>
      </Breadcrumbs>
    </>
  );
}

export const usage: EmpoleonDemo = {
  type: 'code',
  code,
  component: Demo,
};
