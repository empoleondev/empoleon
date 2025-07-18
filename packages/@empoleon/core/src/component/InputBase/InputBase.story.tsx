import { JSX } from 'solid-js';
import { InputBase } from './InputBase';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'InputBase',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function WithinDisabledFieldset() {
  return (
    <fieldset disabled style={{ 'padding': '40px' }}>
      <legend>Disabled fieldset</legend>
      <InputBase label="Disabled by fieldset" placeholder="Disabled by fieldset" />
      <InputBase label="Disabled by prop" placeholder="Disabled by prop" disabled mt="md" />
    </fieldset>
  );
}

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <InputBase
        label="This is input base"
        error="test-error"
        placeholder="test-placeholder"
        data-test="orange"
      />
    </div>
  );
}

export function WithoutAria() {
  return (
    <div style={{ 'padding': '40px' }}>
      <InputBase label="This is input base" placeholder="test-placeholder" withAria={false} />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <InputBase label="This is input base" placeholder="test-placeholder" unstyled />
    </div>
  );
}
