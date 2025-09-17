import { Carousel } from '@empoleon/carousel';
import { Box } from '@empoleon/core';
import { For, JSX } from 'solid-js';

function Slide({ children }: { children: JSX.Element }) {
  return (
    <Box
      style={{
        'background-color': 'var(--empoleon-color-blue-filled)',
        color: 'var(--empoleon-color-white)',
        height: '100%',
        width: '100%',
        display: 'flex',
        'justify-content': 'center',
        'align-items': 'center',
        'font-size': '50px',
        'font-weight': 'bold',
      }}
    >
      {children}
    </Box>
  );
}

export function Slides({ count }: { count: number }) {
  return <For each={Array(count).fill(0)}>
    {(_, index) => (
      <Carousel.Slide>
        <Slide>{index() + 1}</Slide>
      </Carousel.Slide>
    )}
  </For>;
}
