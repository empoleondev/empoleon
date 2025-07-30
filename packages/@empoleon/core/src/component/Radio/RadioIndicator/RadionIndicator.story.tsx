import { createSignal, JSX } from 'solid-js';
import { Radio } from '../Radio';
import { RadioIndicator } from './RadioIndicator';
import { EmpoleonProvider } from '../../../core';

export default {
  title: 'RadioIndicator',
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
      <RadioIndicator checked={checked()} onClick={() => setChecked((c) => !c)} />
      <RadioIndicator checked={checked()} onClick={() => setChecked((c) => !c)} variant="outline" />
      <RadioIndicator
        checked={checked()}
        onClick={() => setChecked((c) => !c)}
        variant="outline"
        disabled
      />
      <RadioIndicator checked={checked()} onClick={() => setChecked((c) => !c)} disabled />
    </div>
  );
}

export function Sizes() {
  const [checked, setChecked] = createSignal(false);
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl'];
  const indicators = sizes.map((size) => (
    <RadioIndicator
      size={size}
      checked={checked()}
      onClick={() => setChecked((c) => !c)}
    />
  ));

  const checkboxes = sizes.map((size) => (
    <Radio size={size} checked={checked()} onChange={() => setChecked((c) => !c)} />
  ));

  return (
    <div style={{ 'padding': '40px' }}>
      <div style={{ display: 'flex' }}>{indicators}</div>
      <div style={{ display: 'flex' }}>{checkboxes}</div>
    </div>
  );
}
