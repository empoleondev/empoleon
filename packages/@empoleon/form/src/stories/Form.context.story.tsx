import { EmpoleonProvider, TextInput } from '@empoleon/core';
import { createFormContext } from '../index';
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

interface FormValues {
  a: number;
  b: string;
}

const [FormProvider, useFormContext, useForm] = createFormContext<FormValues>();

function CustomField() {
  const form = useFormContext();
  return <TextInput {...form.getInputProps('b')} />;
}

export function Context() {
  const form = useForm({
    initialValues: {
      a: 0,
      b: '',
    },
  });

  return (
    <div style={{ padding: '40px' }}>
      <FormProvider form={form}>
        <CustomField />
        {JSON.stringify(form.values)}
      </FormProvider>
    </div>
  );
}
