/* eslint-disable no-console */

import { TextInput } from '@empoleon/core';
import { useForm } from '@empoleon/form';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TextInput } from '@empoleon/core';
import { useForm } from '@empoleon/form';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
    onValuesChange: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <TextInput
        label="Name"
        placeholder="Name"
        key={form.key('name')}
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="md"
        label="Email"
        placeholder="Email"
        key={form.key('email')}
        {...form.getInputProps('email')}
      />
    </div>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
    },
    onValuesChange: (values) => {
      console.log(values);
    },
  });

  return (
    <div>
      <TextInput
        label="Name"
        placeholder="Name"
        {...form.getInputProps('name')}
      />
      <TextInput
        mt="md"
        label="Email"
        placeholder="Email"
        {...form.getInputProps('email')}
      />
    </div>
  );
}

export const onValuesChange: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
