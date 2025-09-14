import { Carousel } from '@empoleon/carousel';
import { EmpoleonDemo } from '@empoleonx/demo';
import { CarouselStylesApi } from '@docs/styles-api';
import { Slides } from './_slides';

const code = `
import { Carousel } from '@empoleon/carousel';

function Demo() {
  return (
    <Carousel withIndicators height={200}{{props}}>
      <Carousel.Slide>1</Carousel.Slide>
      <Carousel.Slide>2</Carousel.Slide>
    </Carousel>
  );
}
`;

function Demo(props: any) {
  return (
    <Carousel withIndicators height='200px' {...props}>
      <Slides count={2} />
    </Carousel>
  );
}

export const stylesApi: EmpoleonDemo = {
  type: 'styles-api',
  data: CarouselStylesApi,
  component: Demo,
  code,
  centered: true,
  maxWidth: '100%',
};
