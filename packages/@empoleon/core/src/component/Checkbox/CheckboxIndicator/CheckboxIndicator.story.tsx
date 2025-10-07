import { createSignal, JSX } from 'solid-js';
import { EmpoleonProvider } from '../../../core';
import { Checkbox } from '../Checkbox';
import { CheckboxIndicator } from './CheckboxIndicator';

export default {
  title: 'CheckboxIndicator',
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
    <div style={{ padding: '40px' }}>
      <CheckboxIndicator checked={checked()} onClick={() => setChecked((c) => !c)} />
      <CheckboxIndicator
        checked={checked()}
        onClick={() => setChecked((c) => !c)}
        variant="outline"
      />
      <CheckboxIndicator
        checked={checked()}
        onClick={() => setChecked((c) => !c)}
        variant="outline"
        disabled
      />
      <CheckboxIndicator checked={checked()} onClick={() => setChecked((c) => !c)} disabled />
    </div>
  );
}

export function Sizes() {
  const [checked, setChecked] = createSignal(false);
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  const indicators = sizes.map((size) => (
    <CheckboxIndicator size={size} checked={checked()} onClick={() => setChecked((c) => !c)} />
  ));

  const checkboxes = sizes.map((size) => (
    <Checkbox size={size} checked={checked()} onChange={() => setChecked((c) => !c)} />
  ));

  return (
    <div style={{ padding: '40px' }}>
      <div style={{ display: 'flex' }}>{indicators}</div>
      <div style={{ display: 'flex' }}>{checkboxes}</div>
    </div>
  );
}
