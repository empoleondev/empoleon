import { JSX } from 'solid-js';
import { Textarea } from './Textarea';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Textarea',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Textarea label="Default" placeholder="Default textarea" />
    </div>
  );
}

export function Resize() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Textarea label="Default" placeholder="Default textarea" resize="vertical" />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Textarea label="Default" placeholder="Default textarea" unstyled />
    </div>
  );
}

export function Autosize() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Textarea label="Autosize" placeholder="Autosize" autosize minRows={4} />
    </div>
  );
}
