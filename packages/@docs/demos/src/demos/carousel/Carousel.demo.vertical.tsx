import { Carousel } from '@empoleon/carousel';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Slides } from './_slides';

const code = `
import { Carousel } from '@empoleon/carousel';

function Demo() {
  return (
    <Carousel orientation="vertical" height={200} withIndicators>
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
    <Carousel orientation="vertical" height='200px' withIndicators>
      <Slides count={5} />
    </Carousel>
  );
}

export const vertical: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 320,
};
