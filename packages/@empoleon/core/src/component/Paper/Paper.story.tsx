import { JSX } from 'solid-js';
import { Paper } from './Paper';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Paper',
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
    <div style={{ 'padding': '40px', 'max-width': '600px' }}>
      <Paper radius="md" shadow="md" withBorder p="xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, et illo? Dolores
        mollitia, maiores est totam ab libero itaque fuga, dolorum hic nesciunt quibusdam, esse amet
        magni quia voluptatibus molestias!
      </Paper>
    </div>
  );
}

export function SpaceSeparatedRadius() {
  return (
    <div style={{ 'padding': '40px', 'max-width': '600px' }}>
      <Paper radius="0 0 1rem 1rem" shadow="md" withBorder p="xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, et illo? Dolores
        mollitia, maiores est totam ab libero itaque fuga, dolorum hic nesciunt quibusdam, esse amet
        magni quia voluptatibus molestias!
      </Paper>
    </div>
  );
}

export function NestedPapers() {
  return (
    <Paper p="md" withBorder shadow="md">
      Parent
      <Paper p="md" shadow="none">
        Child
      </Paper>
    </Paper>
  );
}
