import { JSX } from 'solid-js';
import { TableOfContents } from './TableOfContents';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'TableOfContents',
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
    <div style={{ 'padding': '40px', 'max-width': '350px' }}>
      <TableOfContents
        size="sm"
        initialData={[
          { id: '1', value: 'Heading 1', depth: 1 },
          { id: '2', value: 'Heading 2', depth: 2 },
          { id: '3', value: 'Heading 3', depth: 3 },
        ]}
      />
    </div>
  );
}
