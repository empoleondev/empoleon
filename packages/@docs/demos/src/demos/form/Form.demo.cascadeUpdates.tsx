import { Button, Code, Stack, TextInput } from '@empoleon/core';
import { createFormContext } from '@empoleon/form';
import { EmpoleonDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { Button, Code, Stack, TextInput } from '@empoleon/core';
import { createFormContext } from '@empoleon/form';
import { useState } from 'react';

const [Provider, usePersonFormContext, usePersonForm] = createFormContext<{ person: { name: string } }>();

function Demo() {
  const form = usePersonForm({
    mode: 'uncontrolled',
    cascadeUpdates: true,
    initialValues: {
      person: { name: "" }
    }
  })

  return (
    <Provider form={form}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="Name"

          {...form.getInputProps('person.name')}
        />
        <Button onClick={() => form.setFieldValue("person", { name: "Jane Doe" })}>Set 'person' object to \`{'{ name: "Jane Doe" }'}\`</Button>
        <Watcher />
      </Stack>
    </Provider>
  );
}

function Watcher() {
  const form = usePersonFormContext();

  const [person, setPerson] = useState<{ name: string }>();
  const [name, setName] = useState<string>();

  form.watch('person', ({ value }) => setPerson(value));
  form.watch("person.name", ({ value }) => setName(value));

  return <Code block>{JSON.stringify({ person, name }, null, 2)}</Code>
}
`;

const [Provider, usePersonFormContext, usePersonForm] = createFormContext<{
  person: { name: string };
}>();

function Demo() {
  const form = usePersonForm({
    mode: 'uncontrolled',
    cascadeUpdates: true,
    initialValues: {
      person: { name: '' },
    },
  });

  return (
    <Provider form={form}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="Name"
          {...form.getInputProps('person.name')}
        />
        <Button onClick={() => form.setFieldValue('person', { name: 'Jane Doe' })}>
          Set 'person' object to `{'{ name: "Jane Doe" }'}`
        </Button>
        <Watcher />
      </Stack>
    </Provider>
  );
}

function Watcher() {
  const form = usePersonFormContext();

  const [person, setPerson] = createSignal<{ name: string }>();
  const [name, setName] = createSignal<string>();

  form.watch('person', ({ value }) => setPerson(value));
  form.watch('person.name', ({ value }) => setName(value));

  return <Code block>{JSON.stringify({ person: person(), name: name() }, null, 2)}</Code>;
}

export const cascadeUpdates: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
