import { NumberInput, TextInput } from '@empoleon/core';
import { useForm } from '@empoleon/form';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { NumberInput, TextInput } from '@empoleon/core';
import { useForm } from '@empoleon/form';

interface FormValues {
  name: string;
  age: number | string;
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: '' },
    enhanceGetInputProps: (payload) => ({
      disabled: payload.field === 'name',
    }),
  });

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        key={form.key('name')}
        label="Name"
        placeholder="Name"
      />
      <NumberInput
        {...form.getInputProps('age')}
        key={form.key('age')}
        label="Age"
        placeholder="Age"
        mt="md"
      />
    </>
  );
}
`;

interface FormValues {
  name: string;
  age: number | string;
}

function Demo() {
  const form = useForm<FormValues>({
    mode: 'uncontrolled',
    initialValues: { name: '', age: '' },
    enhanceGetInputProps: (payload) => ({
      disabled: payload.field === 'name',
    }),
  });

  return (
    <>
      <TextInput
        {...form.getInputProps('name')}
        label="Name"
        placeholder="Name"
      />
      <NumberInput
        {...form.getInputProps('age')}
        label="Age"
        placeholder="Age"
        mt="md"
      />
    </>
  );
}

export const enhanceGetInputProps: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
