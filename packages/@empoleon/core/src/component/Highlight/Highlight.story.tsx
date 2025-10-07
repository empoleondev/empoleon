import { JSX } from 'solid-js';
import { EmpoleonProvider } from '../../core';
import { Highlight } from './Highlight';

export default {
  title: 'Highlight',
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
      <Highlight highlight={['this', 'that']}>
        Highlight this and also that, oh and this should be highlighted as well
      </Highlight>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px' }}>
      <Highlight highlight={['this', 'that']} unstyled>
        Highlight this and also that, oh and this should be highlighted as well
      </Highlight>
    </div>
  );
}
