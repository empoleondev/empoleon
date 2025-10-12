import { createSignal, For } from 'solid-js';
import { Pagination, Text } from '@empoleon/core';
import { randomId } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { randomId } from '@empoleon/hooks';
import { Pagination, Text } from '@empoleon/core';

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const data = chunk(
  Array(30)
    .fill(0)
    .map((_, index) => ({ id: index, name: randomId() })),
  5
);

function Demo() {
  const [activePage, setPage] = useState(1);
  const items = data[activePage - 1].map((item) => (
    <Text >
      id: {item.id}, name: {item.name}
    </Text>
  ));

  return (
    <>
      {items}
      <Pagination total={data.length} value={activePage} onChange={setPage} mt="sm" />
    </>
  );
}
`;

function chunk<T>(array: T[], size: number): T[][] {
  if (!array.length) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
}

const data = chunk(
  Array(30)
    .fill(0)
    .map((_, index) => ({ id: index, name: randomId() })),
  5
);

function Demo() {
  const [activePage, setPage] = createSignal(1);

  return (
    <>
      <For each={data[activePage() - 1]}>
        {(item) => (
          <Text>
            id: {item.id}, name: {item.name}
          </Text>
        )}
      </For>
      <Pagination total={data.length} value={activePage()} onChange={setPage} mt="sm" />
    </>
  );
}

export const withContent: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
};
