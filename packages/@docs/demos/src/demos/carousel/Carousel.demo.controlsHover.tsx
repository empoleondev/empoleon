import { Carousel } from '@empoleon/carousel';
import { EmpoleonDemo } from '@empoleonx/demo';
import { Slides } from './_slides';
import classes from './Carousel.demo.controlsHover.module.css';

const cssCode = `.controls {
  transition: opacity 150ms ease;
  opacity: 0;
}

.root {
  &:hover {
    .controls {
      opacity: 1;
    }
  }
}`;

const code = `
import { Carousel } from '@empoleon/carousel';
import classes from './Demo.module.css';

function Demo() {
  return (
    <Carousel height={200} classNames={classes}>
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
    <Carousel height="200px" classNames={classes}>
      <Slides count={5} />
    </Carousel>
  );
}

export const controlsHover: EmpoleonDemo = {
  type: 'code',
  component: Demo,
  code: [
    { fileName: 'Demo.tsx', code, language: 'tsx' },
    { fileName: 'Demo.module.css', code: cssCode, language: 'scss' },
  ],
  centered: true,
  maxWidth: 320,
};
