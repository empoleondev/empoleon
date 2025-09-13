import { Button, Group, TextInput } from '@empoleon/core';
import { useForm } from '@empoleon/form';
import { randomId } from '@empoleon/hooks';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { useForm } from '@empoleon/form';
import { TextInput, Button, Group } from '@empoleon/core';
import { randomId } from '@empoleon/hooks';

function Demo() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
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

      <Group justify="center" mt="xl">
        <Button onClick={() => form.setFieldValue('name', randomId())}>Random name</Button>
        <Button onClick={() => form.setFieldValue('email', \`\${randomId()}@test.com\`)}>
          Random email
        </Button>
      </Group>
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

      <Group justify="center" mt="xl">
        <Button onClick={() => form.setFieldValue('name', randomId())}>Random name</Button>
        <Button onClick={() => form.setFieldValue('email', `${randomId()}@test.com`)}>
          Random email
        </Button>
      </Group>
    </div>
  );
}

export const setFieldValue: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
