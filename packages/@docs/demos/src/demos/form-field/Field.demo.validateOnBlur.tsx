import { TextInput } from '@empoleon/core';
import { useField } from '@empoleon/form';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TextInput } from '@empoleon/core';
import { useField } from '@empoleon/form';

function Demo() {
  const field = useField({
    initialValue: '',
    validateOnBlur: true,
    validate: (value) => (value.trim().length < 2 ? 'Value is too short' : null),
  });

  return <TextInput {...field.getInputProps()} label="Name" placeholder="Enter your name" />;
}
`;

function Demo() {
  const field = useField({
    initialValue: '',
    validateOnBlur: true,
    validate: (value) => (value.trim().length < 2 ? 'Value is too short' : null),
  });

  return <TextInput {...field.getInputProps()} label="Name" placeholder="Enter your name" />;
}

export const validateOnBlur: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
