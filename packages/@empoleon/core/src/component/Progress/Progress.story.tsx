import { JSX } from 'solid-js';
import { Progress } from './Progress';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Progress',
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
      <Progress value={56} />
    </div>
  );
}

export function Striped() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Progress value={56} size="xl" animated />
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Progress value={56} size="xl" unstyled />
    </div>
  );
}

export function Compound() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Progress.Root size="xl" autoContrast>
        <Progress.Section value={56} color="lime.4">
          <Progress.Label>Documents</Progress.Label>
        </Progress.Section>
        <Progress.Section value={20} color="yellow.4">
          <Progress.Label>Apps</Progress.Label>
        </Progress.Section>
        <Progress.Section value={15} color="cyan.7">
          <Progress.Label>Others</Progress.Label>
        </Progress.Section>
      </Progress.Root>
    </div>
  );
}
