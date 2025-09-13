/* eslint-disable no-console */

import { Button, TextInput } from '@empoleon/core';
import { useForm } from '@empoleon/form';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { useForm } from '@empoleon/form';
import { TextInput, Button } from '@empoleon/core';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { text: 'initial value' },
  });

  return (
    <div>
      <TextInput
        {...form.getInputProps('text')}
        key={form.key('text')}
        label="Touched/dirty demo"
        placeholder="Touched/dirty demo"
      />

      <Button
        onClick={() =>
          console.log({ touched: form.isTouched('text'), dirty: form.isDirty('text') })
        }
      >
        Log status to console
      </Button>
    </div>
  );
}
`;

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: { text: 'initial value' },
  });

  return (
    <div>
      <TextInput
        {...form.getInputProps('text')}
        label="Touched/dirty demo"
        placeholder="Touched/dirty demo"
      />

      <Button
        mt="md"
        onClick={() =>
          console.log({ touched: form.isTouched('text'), dirty: form.isDirty('text') })
        }
      >
        Log status to console
      </Button>
    </div>
  );
}

export const status: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
