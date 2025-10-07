import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { Skeleton } from './Skeleton';

export default {
  title: 'Skeleton',
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
      <Skeleton height={'200px'} />
    </div>
  );
}

export function Circle() {
  return (
    <div style={{ padding: '40px' }}>
      <Skeleton height={'200px'} circle />
    </div>
  );
}
