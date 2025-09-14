import { IconArrowLeft, IconArrowRight } from '@tabler/icons-solidjs';
import { Carousel } from '@empoleon/carousel';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Slides } from './_slides';

const code = `
import { Carousel } from '@empoleon/carousel';
import { IconArrowRight, IconArrowLeft } from '@tabler/icons-solidjs';

function Demo() {
  return (
    <Carousel
      height={180}
      nextControlIcon={<IconArrowRight size={16} />}
      previousControlIcon={<IconArrowLeft size={16} />}
    >
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
      <Carousel.Slide>3</Carousel.Slide>
      {/* ...other slides */}
    </Carousel>
  );
}
`;

function Demo() {
  return (
    <Carousel
      height='180px'
      nextControlIcon={<IconArrowRight size={16} />}
      previousControlIcon={<IconArrowLeft size={16} />}
    >
      <Slides count={5} />
    </Carousel>
  );
}

export const icons: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 320,
};
