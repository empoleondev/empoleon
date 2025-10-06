import { Code, Stack, TextInput } from '@empoleon/core';
import { useSet } from '@empoleon/hooks';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal, For } from 'solid-js';

const code = `
import { useState } from 'react';
import { Code, Stack, TextInput } from '@empoleon/core';
import { useSet } from '@empoleon/hooks';

function Demo() {
  const [input, setInput] = useState('');
  const scopes = useSet<string>(['@empoleon', '@empoleon-tests', '@empoleonx']);

  const isDuplicate = scopes.has(input.trim().toLowerCase());

  const items = Array.from(scopes).map((scope) => <Code >{scope}</Code>);

  return (
    <>
      <TextInput
        label="Add new scope"
        placeholder="Enter scope"
        description="Duplicate scopes are not allowed"
        value={input}
        onChange={(event) => setInput(event.currentTarget.value)}
        error={isDuplicate && 'Scope already exists'}
        onKeyDown={(event) => {
          if (event.nativeEvent.code === 'Enter' && !isDuplicate) {
            scopes.add(input.trim().toLowerCase());
            setInput('');
          }
        }}
      />

      <Stack gap={5} align="flex-start" mt="md">
        {items}
      </Stack>
    </>
  );
}
`;

function Demo() {
  const [input, setInput] = createSignal('');
  // Call useSet ONCE, not inside a function
  const scopes = useSet<string>(['@empoleon', '@empoleon-tests', '@empoleonx']);

  const isDuplicate = () => scopes.has(input().trim().toLowerCase());

  return (
    <>
      <TextInput
        label="Add new scope"
        placeholder="Enter scope"
        description="Duplicate scopes are not allowed"
        value={input()}
        onChange={(event) => setInput(event.currentTarget.value)}
        error={isDuplicate() && 'Scope already exists'}
        onKeyDown={(event) => {
          if (event.code === 'Enter' && !isDuplicate()) {
            scopes.add(input().trim().toLowerCase());
            setInput('');
          }
        }}
      />

      <Stack gap={5} align="flex-start" mt="md">
        <For each={Array.from(scopes)}>
          {(scope) => <Code>{scope}</Code>}
        </For>
      </Stack>
    </>
  );
}

export const useSetUsage: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
};
