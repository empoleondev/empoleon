import { Button, Text, TextInput } from '@empoleon/core';
import { useField } from '@empoleon/form';
import { MantineDemo } from '@empoleonx/demo';
import { createSignal } from 'solid-js';

const code = `
import { Button, TextInput } from '@empoleon/core';
import { useField } from '@empoleon/form';

function Demo() {
  const field = useField({ mode: 'uncontrolled', initialValue: '' });
  const [fieldStatus, setFieldStatus] = useState({ touched: false, dirty: false });
  const updateStatus = () => {
    setFieldStatus({ touched: field.isTouched(), dirty: field.isDirty() });
  };

  return (
    <>
      <TextInput {...field.getInputProps()} label="Name" placeholder="Enter your name" mb="md" />

      <Text fz="sm">
        Dirty:{' '}
        <Text span inherit c={fieldStatus.dirty ? 'red' : 'teal'}>
          {fieldStatus.dirty ? 'dirty' : 'not dirty'}
        </Text>
      </Text>
      <Text fz="sm">
        Dirty:{' '}
        <Text span inherit c={fieldStatus.touched ? 'red' : 'teal'}>
          {fieldStatus.touched ? 'touched' : 'not touched'}
        </Text>
      </Text>

      <Button onClick={updateStatus} mt="md">
        Update Status
      </Button>
    </>
  );
}
`;

function Demo() {
  const field = useField({ mode: 'uncontrolled', initialValue: '' });
  const [fieldStatus, setFieldStatus] = createSignal({ touched: false, dirty: false });
  const updateStatus = () => {
    setFieldStatus({ touched: field.isTouched(), dirty: field.isDirty() });
  };

  return (
    <>
      <TextInput {...field.getInputProps()} label="Name" placeholder="Enter your name" mb="md" />

      <Text fz="sm">
        Dirty:{' '}
        <Text span inherit c={fieldStatus().dirty ? 'red' : 'teal'}>
          {fieldStatus().dirty ? 'dirty' : 'not dirty'}
        </Text>
      </Text>
      <Text fz="sm">
        Dirty:{' '}
        <Text span inherit c={fieldStatus().touched ? 'red' : 'teal'}>
          {fieldStatus().touched ? 'touched' : 'not touched'}
        </Text>
      </Text>

      <Button onClick={updateStatus} mt="md">
        Update Status
      </Button>
    </>
  );
}

export const statusUncontrolled: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 340,
};
