import { createSignal } from 'solid-js';
import { Loader, Text, TextInput } from '@empoleon/core';
import { useDebouncedCallback } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';

const code = `
import { useState } from 'react';
import { Loader, Text, TextInput } from '@empoleon/core';
import { useDebouncedCallback } from '@empoleon/hooks';

function getSearchResults(query: string): Promise<{ id: number; title: string }[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        query.trim() === ''
          ? []
          : Array(5)
              .fill(0)
              .map((_, index) => ({ id: index, title: \`\${query} \${index + 1}\` }))
      );
    }, 1000);
  });
}

function Demo() {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = useDebouncedCallback(async (query: string) => {
    setLoading(true);
    setSearchResults(await getSearchResults(query));
    setLoading(false);
  }, 500);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

  return (
    <>
      <TextInput
        value={search}
        onChange={handleChange}
        placeholder="Search..."
        rightSection={loading && <Loader size={20} />}
      />
      {searchResults.map((result) => (
        <Text size="sm">
          {result.title}
        </Text>
      ))}
    </>
  );
}
`;

function getSearchResults(query: string): Promise<{ id: number; title: string }[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        query.trim() === ''
          ? []
          : Array(5)
              .fill(0)
              .map((_, index) => ({ id: index, title: `${query} ${index + 1}` }))
      );
    }, 1000);
  });
}

function Demo() {
  const [search, setSearch] = createSignal('');
  const [searchResults, setSearchResults] = createSignal<{ id: number; title: string }[]>([]);
  const [loading, setLoading] = createSignal(false);

  const handleSearch = useDebouncedCallback(async (query: string) => {
    setLoading(true);
    setSearchResults(await getSearchResults(query));
    setLoading(false);
  }, 500);

  const handleChange = (event: Event & { currentTarget: HTMLInputElement; target: Element }) => {
    setSearch(event.currentTarget.value);
    handleSearch(event.currentTarget.value);
  };

  return (
    <>
      <TextInput
        value={search()}
        onChange={handleChange}
        placeholder="Search..."
        rightSection={loading() && <Loader size={20} />}
      />
      {searchResults().map((result) => (
        <Text size="sm">{result.title}</Text>
      ))}
    </>
  );
}

export const useDebouncedCallbackUsage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
