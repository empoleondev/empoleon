import { Carousel } from '@empoleon/carousel';
import { Image } from '@empoleon/core';
import { EmpoleonDemo } from '@empoleonx/demo';
import { images as _images } from './_images';
import { For } from 'solid-js';

const code = `
import { Carousel } from '@empoleon/carousel';
import { Image } from '@empoleon/core';

const images = [
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png',
  'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-5.png',
];

function Demo() {
  return (
    <Carousel withIndicators height={200}>
      <For each={_images}>
        {(url) => (
          <Carousel.Slide>
            <Image src={url} />
          </Carousel.Slide>
        )}
      </For>
    </Carousel>
  );
}
`;

function Demo() {
  return (
    <Carousel withIndicators height='200px'>
      <For each={_images}>
        {(url) => (
          <Carousel.Slide>
            <Image src={url} />
          </Carousel.Slide>
        )}
      </For>
    </Carousel>
  );
}

export const images: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  maxWidth: 380,
  centered: true,
};
