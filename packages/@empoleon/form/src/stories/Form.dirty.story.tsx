import { IconTrash } from '@tabler/icons-solidjs';
import { ActionIcon, Button, Code, Group, EmpoleonProvider, Text, TextInput } from '@empoleon/core';
import { useForm } from '../use-form';
import { JSX } from 'solid-js';

export default {
   title: 'Form',
   decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ]
};

import { createSignal, For } from 'solid-js';

export function Dirty() {
  const [formArray, setFormArray] = createSignal([
    {
      one: '1',
      two: '1',
    },
    {
      one: '2',
      two: '2',
    },
  ]);

  const initialValues = [
    {
      one: '1',
      two: '1',
    },
    {
      one: '2',
      two: '2',
    },
  ];

  const removeListItem = (index: number) => {
    setFormArray(prev => prev.filter((_, i) => i !== index));
  };

  const insertListItem = (newItem: { one: string; two: string }) => {
    setFormArray(prev => [...prev, newItem]);
  };

  const updateItem = (index: number, field: keyof { one: string; two: string }, value: string) => {
    setFormArray(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ));
  };

  const isDirty = () => {
    return JSON.stringify(formArray()) !== JSON.stringify(initialValues);
  };

  return (
    <>
      <For each={formArray()}>
        {(item, index) => (
          <Group>
            <ActionIcon onClick={() => removeListItem(index())}>
              <IconTrash size={16} />
            </ActionIcon>
            <TextInput
              value={item.one}
              onInput={(e) => updateItem(index(), 'one', e.target.value)}
            />
            <TextInput
              value={item.two}
              onInput={(e) => updateItem(index(), 'two', e.target.value)}
            />
          </Group>
        )}
      </For>
      <Button onClick={() => insertListItem({ one: '', two: '' })}>
        Add item
      </Button>
      <Text>{isDirty() ? 'Dirty' : 'Not Dirty'}</Text>
      <Code block>{JSON.stringify(formArray(), null, 2)}</Code>
    </>
  );
}

export function DirtyUncontrolled() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      text: '1',
    },
  });

  console.log('render');

  return (
    <div style={{ 'max-width': '500px', margin: 'auto', 'padding': '40px' }}>
      <TextInput {...form.getInputProps('text')} />
      <div>{form.isDirty() ? 'Dirty' : 'Not dirty'}</div>
    </div>
  );
}
