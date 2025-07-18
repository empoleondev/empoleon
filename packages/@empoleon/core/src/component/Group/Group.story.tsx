import { JSX } from 'solid-js';
import { Group } from './Group';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Group',
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
      <Group component="nav">
        <button type="button">First</button>
        <button type="button">Second</button>
        <button type="button">Third</button>
      </Group>
    </div>
  );
}

export function Grow() {
  return (
    <div style={{ 'padding': '40px' }}>
      <Group grow>
        <button type="button">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas ducimus necessitatibus
          placeat tenetur error officia vero accusantium? Dolorem commodi quaerat incidunt odit
          eligendi beatae tempore ducimus, unde obcaecati dolor at?
        </button>
        <button type="button">Second</button>
        <button type="button">Third</button>
      </Group>
    </div>
  );
}
