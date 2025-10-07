import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { Button } from '../Button';
import { SimpleGrid } from './SimpleGrid';

export default {
  title: 'SimpleGrid',
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
    <div style={{ padding: '40px' }}>
      <SimpleGrid cols={{ sm: 2, md: 5 }} spacing={{ sm: 100 }} verticalSpacing={{ sm: 10 }}>
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Button>{index}</Button>
          ))}
      </SimpleGrid>
    </div>
  );
}

export function ContainerQueries() {
  return (
    <div style={{ padding: '40px' }}>
      <SimpleGrid
        type="container"
        cols={{ '1000px': 5, '700px': 2 }}
        spacing={{ base: 'sm', '500px': 'md', '700px': 'xl', '900px': 50 }}
        styles={{ container: { border: '1px solid red', resize: 'both', overflow: 'hidden' } }}
      >
        {Array(10)
          .fill(0)
          .map((_, index) => (
            <Button>{index}</Button>
          ))}
      </SimpleGrid>
    </div>
  );
}
