import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@empoleon/carousel';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Slides } from './_slides';
import { createSignal, onMount, onCleanup } from 'solid-js';
import type { AutoplayType } from 'embla-carousel-autoplay';

const code = `
import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@empoleon/carousel';

function Demo() {
  const autoplay = useRef(Autoplay({ delay: 1000 }));

  return (
    <Carousel
      withIndicators
      height={200}
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      onMouseLeave={() => autoplay.current.play()}
    >
      <Slides count={5} />
    </Carousel>
  );
}
`;

function Demo() {
  const [autoplayInstance, setAutoplayInstance] = createSignal<AutoplayType>();

  onMount(() => {
    // Initialize autoplay when component mounts
    const instance = Autoplay({ delay: 1000 });
    setAutoplayInstance(instance);
  });

  onCleanup(() => {
    // Clean up if needed when component unmounts
    const instance = autoplayInstance();
    if (instance?.destroy) {
      instance.destroy();
    }
  });

  const handleMouseEnter = () => {
    autoplayInstance()?.stop();
  };

  const handleMouseLeave = () => {
    autoplayInstance()?.play();
  };

  return (
    <Carousel
      withIndicators
      height='200px'
      plugins={autoplayInstance() ? [autoplayInstance()!] : []}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Slides count={5} />
    </Carousel>
  );
}

export const autoplay: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 320,
};
