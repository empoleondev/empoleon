import { EmblaCarouselType } from 'embla-carousel';
import { Carousel } from '@empoleon/carousel';
import { Progress } from '@empoleon/core';
import { MantineDemo } from '@empoleonx/demo';
import { Slides } from './_slides';
import { createEffect, createSignal } from 'solid-js';

const code = `
import { useCallback, useEffect, useState } from 'react';
import { EmblaCarouselType } from 'embla-carousel';
import { Carousel } from '@empoleon/carousel';
import { Progress } from '@empoleon/core';

function Demo() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);

  const handleScroll = useCallback(() => {
    if (!embla) {
      return;
    }
    const progress = Math.max(0, Math.min(1, embla.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [embla, setScrollProgress]);

  useEffect(() => {
    if (embla) {
      embla.on('scroll', handleScroll);
      handleScroll();
    }
  }, [embla]);

  return (
    <>
      <Carousel
        emblaOptions={{ dragFree: true }}
        slideSize="50%"
        slideGap="md"
        height={200}
        getEmblaApi={setEmbla}
        initialSlide={2}
      >
        <Slides count={12} />
      </Carousel>
      <Progress value={scrollProgress} maw={320} size="sm" mt="xl" mx="auto" />
    </>
  );
}
`;

function Demo() {
  const [scrollProgress, setScrollProgress] = createSignal(0);
  const [embla, setEmbla] = createSignal<EmblaCarouselType | null>(null);

  const handleScroll = () => {
    const emblaInstance = embla();
    if (!emblaInstance) {
      return;
    }
    const progress = Math.max(0, Math.min(1, emblaInstance.scrollProgress()));
    setScrollProgress(progress * 100);
  };

  createEffect(() => {
    const emblaInstance = embla();
    if (emblaInstance) {
      emblaInstance.on('scroll', handleScroll);
      handleScroll();

      // Cleanup function
      return () => {
        emblaInstance.off('scroll', handleScroll);
      };
    }
  });

  return (
    <>
      <Carousel
        emblaOptions={{ dragFree: true }}
        slideSize="50%"
        slideGap="md"
        height='200px'
        getEmblaApi={setEmbla}
        initialSlide={2}
      >
        <Slides count={12} />
      </Carousel>
      <Progress value={scrollProgress()} maw={320} size="sm" mt="xl" mx="auto" />
    </>
  );
}

export const progress: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
};
