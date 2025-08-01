import { createSignal, JSX } from 'solid-js';
import { RadioGroup } from '../RadioGroup/RadioGroup';
import { RadioIndicator } from '../RadioIndicator/RadioIndicator';
import { RadioCard } from './RadioCard';
import { EmpoleonProvider } from '../../../core';

export default {
  title: 'RadioCard',
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
      <RadioCard p="md" checked={checked()} onClick={() => setChecked((c) => !c)}>
        <RadioIndicator />
        Some label
      </RadioCard>
    </div>
  );
}

export function WithinGroup() {
  const [value, setValue] = createSignal<string | null>(null);

  return (
    <div style={{ 'padding': '40px' }}>
      <RadioGroup value={value()} onChange={setValue} name="test-name">
        <RadioCard value="1">
          <RadioIndicator />
          Option 1
        </RadioCard>

        <RadioCard value="2">
          <RadioIndicator />
          Option 2
        </RadioCard>
      </RadioGroup>

      <div>{JSON.stringify(value)}</div>
    </div>
  );
}
