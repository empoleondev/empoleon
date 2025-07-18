import { FileInput } from './FileInput';
import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { createSignal } from 'solid-js';

export default {
  title: 'FileInput',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  const [value, setValue] = createSignal<File | null>(null);
  return (
    <div style={{ 'padding': '40px' }}>
      <FileInput placeholder="Pick file" value={value()} onChange={setValue} />
    </div>
  );
}

export function Unstyled() {
  const [value, setValue] = createSignal<File | null>(null);
  return (
    <div style={{ 'padding': '40px' }}>
      <FileInput placeholder="Pick file" value={value()} onChange={setValue} unstyled />
    </div>
  );
}

export function Multiple() {
  const [value, setValue] = createSignal<File[]>([]);
  return (
    <div style={{ 'padding': '40px' }}>
      <FileInput placeholder="Multiple" multiple value={value()} onChange={setValue} clearable />
    </div>
  );
}
