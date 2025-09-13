import { Carousel } from '@empoleon/carousel';
import { MantineDemo } from '@empoleonx/demo';
import { Slides } from './_slides';

const code = `
import { Carousel } from '@empoleon/carousel';

function Demo() {
  return (
    <Carousel withIndicators height={200}>
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
    <Carousel withIndicators height='200px'>
      <Slides count={5} />
    </Carousel>
  );
}

export const usage: MantineDemo = {
  type: 'code',
  component: Demo,
  code,
  centered: true,
  maxWidth: 320,
};
