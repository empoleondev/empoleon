import { useForm } from '@empoleon/form';
import { EmpoleonProvider } from '../../../core';
import { CheckboxGroup } from '../CheckboxGroup/CheckboxGroup';
import { CheckboxIndicator } from '../CheckboxIndicator/CheckboxIndicator';
import { CheckboxCard } from './CheckboxCard';
import { createSignal, JSX } from 'solid-js';

export default {
  title: 'CheckboxCard',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  const [checked, setChecked] = createSignal(false);
  return (
    <div style={{ 'padding': '40px' }}>
      <CheckboxCard p="md" checked={checked()} onClick={() => setChecked((c) => !c)}>
        <CheckboxIndicator />
        Some label
      </CheckboxCard>
    </div>
  );
}

export function WithinGroup() {
  const [value, setValue] = createSignal<string[]>(['1']);

  return (
    <div style={{ 'padding': '40px' }}>
      <CheckboxGroup value={value()} onChange={setValue}>
        <CheckboxCard value="1">
          <CheckboxIndicator />
          Option 1
        </CheckboxCard>

        <CheckboxCard value="2">
          <CheckboxIndicator />
          Option 2
        </CheckboxCard>
      </CheckboxGroup>

      <div>{JSON.stringify(value())}</div>
    </div>
  );
}

export function WithUseForm() {
  const form = useForm({ mode: 'uncontrolled', initialValues: { checkbox: true } });

  return (
    <div style={{ 'padding': '40px' }}>
      <CheckboxCard
        p="md"
        {...form.getInputProps('checkbox', { type: 'checkbox' })}
      >
        <CheckboxIndicator />
        Some label
      </CheckboxCard>

      {JSON.stringify(form.values)}
    </div>
  );
}
