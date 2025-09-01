import { Button, Checkbox, EmpoleonProvider, NativeSelect, Textarea, TextInput } from '@empoleon/core';
import { createFormActions } from '../actions';
import { useForm } from '../use-form';
import { FormBase } from './_base';
import { createEffect, JSX, Show } from 'solid-js';

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

interface FormValues {
  name: string;
  terms: boolean;
  area: string;
  select: string;
}

const formActions = createFormActions<FormValues>('test-form');

export function FormActions() {
  const form = useForm<FormValues>({
    name: 'test-form',
    initialValues: { name: '', terms: false, area: '', select: '' },
    validate: {
      name: (value) => (value.length === 0 ? 'Required' : null),
    },
  });

  return (
    <FormBase form={form}>
      <TextInput label="Name" {...form.getInputProps('name')} />
      <Checkbox
        mt="md"
        label="Accept terms of use"
        {...form.getInputProps('terms', { type: 'checkbox' })}
      />
      <Textarea label="area" {...form.getInputProps('area')} />
      <NativeSelect
        label="native select"
        data={['React', 'Angular']}
        {...form.getInputProps('select', { type: "select" })}
      />

      <Button type="button" onClick={() => formActions.setValues({ name: 'test-name', area: 'test-area' })}>
        Set values
      </Button>
      <Button type="button" onClick={() => formActions.setFieldValue('terms', true)}>Set field value</Button>
      <Button type="button" onClick={() => formActions.validate()}>Validate</Button>
    </FormBase>
  );
}
