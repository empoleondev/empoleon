import { TextInput } from '@empoleon/core';
import { isEmail, useField } from '@empoleon/form';
import { MantineDemo } from '@empoleonx/demo';

const code = `
import { TextInput } from '@empoleon/core';
import { useField, isEmail } from '@empoleon/form';

function Demo() {
  const field = useField({
    initialValue: '',
    validateOnChange: true,
    validate: isEmail('Invalid email'),
  });

  return <TextInput {...field.getInputProps()} label="Email" placeholder="Enter your email" />;
}
`;

function Demo() {
  const field = useField({
    initialValue: '',
    validateOnChange: true,
    validate: isEmail('Invalid email'),
  });

  return <TextInput {...field.getInputProps()} label="Email" placeholder="Enter your email" />;
}

export const validateOnChange: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
