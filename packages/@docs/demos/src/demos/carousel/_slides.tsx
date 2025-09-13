import { Carousel } from '@empoleon/carousel';
import { Box } from '@empoleon/core';
import { JSX } from 'solid-js';

function Slide({ children }: { children: JSX.Element }) {
  return (
    <Box
      style={{
        backgroundColor: 'var(--mantine-color-blue-filled)',
        color: 'var(--mantine-color-white)',
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 50,
        fontWeight: 'bold',
      }}
    >
      {children}
    </Box>
  );
}

export function Slides({ count }: { count: number }) {
  const slides = Array(count)
    .fill(0)
    .map((_, index) => (
      <Carousel.Slide>
        <Slide>{index + 1}</Slide>
      </Carousel.Slide>
    ));
  return <>{slides}</>;
}
