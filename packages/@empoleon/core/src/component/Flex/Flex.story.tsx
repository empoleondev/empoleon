import { JSX } from 'solid-js';
import { Button } from '../Button';
import { Flex } from './Flex';
import { EmpoleonProvider } from '../../core';

export default {
  title: 'Flex',
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
      <Flex>
        <Button>First</Button>
        <Button>Second</Button>
      </Flex>
    </div>
  );
}
