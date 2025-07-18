import { Checkbox, EmpoleonProvider, TextInput } from '@empoleon/core';
import { useForm } from '../use-form';
import { FormBase } from './_base';
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

export function NestedObject() {
  const form = useForm({
    initialValues: {
      user: { name: '' },
      terms: false,
      users: [
        {
          name: 'Dan Abramov',
          key: 'randomId()',
          tags: [{ tag: 'React', key: 'randomId()' }],
        },
      ],
    },
    validate: {
      user: {
        name: (value) => (value.length === 0 ? 'Required' : null),
      },

      users: {
        tags: {
          tag: (_value, _values) => (_values ? 'Required' : null),
        },
      },
    },
  });

  return (
    <FormBase form={form}>
      <TextInput label="Name" {...form.getInputProps('user.name')} />
      <Checkbox
        mt="md"
        label="Accept terms of use"
        {...form.getInputProps('terms', { type: 'checkbox' })}
      />
    </FormBase>
  );
}
