import { JSX } from 'solid-js';
import { Code } from './Code';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Code',
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
      <Code>Some code</Code>
      <Code color="blue.4">Code with color</Code>
    </div>
  );
}
export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Code unstyled>Some code</Code>
    </div>
  );
}

const code = `
export function Usage() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Code>Some code</Code>
      <Code color="blue.4">Code with color</Code>
    </div>
  );
}
`.trim();

export function Block() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Code block>{code}</Code>
    </div>
  );
}
