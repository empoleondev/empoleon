import Autoplay from 'embla-carousel-autoplay';
import { createSignal, For, Index, JSX } from 'solid-js';
import { Box, Button, EmpoleonProvider } from '@empoleon/core';
import { Carousel } from './Carousel';

export default {
  title: 'Carousel',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

const slides = [1, 2, 3, 4];

export function Usage() {
  return (
    <div style={{ padding: '40px' }}>
      <Carousel
        slideGap="md"
        slideSize={{ base: '100%', '400px': '50%', '600px': '33.333333%' }}
        height="200px"
        withIndicators
        emblaOptions={{ align: 'start' }}
        type="container"
      >
        <For each={slides}>
          {(_, index) => (
            <Carousel.Slide bg="pink.1">
              <Box bg="pink.5">Slide {index() + 1}</Box>
            </Carousel.Slide>
          )}
        </For>
      </Carousel>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ padding: '40px', 'max-width': '500px' }}>
      <Carousel slideSize="70%" slideGap="md" height="200px" unstyled>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 1</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 2</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 3</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 4</Box>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}

export function InitialSlide() {
  return (
    <div style={{ padding: '40px', 'max-width': '500px' }}>
      <Carousel
        slideSize="70%"
        slideGap="md"
        height="200px"
        emblaOptions={{ loop: true }}
        initialSlide={2}
      >
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 1</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 2</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 3</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 4</Box>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}

export function SlidesToScroll() {
  return (
    <div style={{ padding: '40px', 'max-width': '500px' }}>
      <Carousel slideSize="50%" slideGap="md" height="200px" emblaOptions={{ slidesToScroll: 2 }}>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 1</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 2</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 3</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 4</Box>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}

export function Vertical() {
  return (
    <div style={{ padding: '40px', 'max-width': '500px' }}>
      <Carousel slideSize={120} height="200px" slideGap="md" orientation="vertical">
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 1</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 2</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 3</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 4</Box>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}

export function AutoPlay() {
  const autoplay = Autoplay({ delay: 500, stopOnInteraction: false });

  return (
    <div style={{ padding: '40px', 'max-width': '500px' }}>
      <Carousel
        height="200px"
        plugins={[autoplay]}
        onMouseEnter={autoplay.stop}
        onMouseLeave={autoplay.reset}
        withIndicators
      >
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 1</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 2</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 3</Box>
        </Carousel.Slide>
        <Carousel.Slide bg="pink.1">
          <Box bg="pink.5">Slide 4</Box>
        </Carousel.Slide>
      </Carousel>
    </div>
  );
}

export function DynamicSlides() {
  const [count, setCount] = createSignal(1);

  const slideIndices = () => Array.from({ length: count() }, (_, i) => i);

  return (
    <div style={{ padding: '40px', 'max-width': '500px' }}>
      <Carousel height="200px" withIndicators>
        <Index each={slideIndices()}>
          {(index) => (
            <Carousel.Slide style={{ height: '200px', background: 'pink', width: '100%' }}>
              {index()}
            </Carousel.Slide>
          )}
        </Index>
      </Carousel>
      <Button onClick={() => setCount((c) => c + 1)}>Increment</Button>
      <Button onClick={() => setCount((c) => c - 1)}>Decrement</Button>
    </div>
  );
}

export function PercentageHeight() {
  return (
    <div style={{ height: '400px', display: 'flex' }}>
      <Carousel withIndicators height="100%" style={{ flex: 1 }}>
        <Carousel.Slide style={{ background: 'blue' }}>1</Carousel.Slide>
        <Carousel.Slide style={{ background: 'red' }}>2</Carousel.Slide>
        <Carousel.Slide style={{ background: 'orange' }}>3</Carousel.Slide>
      </Carousel>
    </div>
  );
}
