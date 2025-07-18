import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '@empoleon/core';
import { useCarouselContext } from '../Carousel.context';
import classes from '../Carousel.module.css';

export type CarouselSlideStylesNames = 'slide';

export interface CarouselSlideProps
  extends BoxProps,
    CompoundStylesApiProps<CarouselSlideFactory>,
    ElementProps<'div'> {}

export type CarouselSlideFactory = Factory<{
  props: CarouselSlideProps;
  ref: HTMLDivElement;
  stylesNames: CarouselSlideStylesNames;
  compound: true;
}>;

const defaultProps: Partial<CarouselSlideProps> = {};

export const CarouselSlide = factory<CarouselSlideFactory>(_props => {
  const props = useProps('CarouselSlide', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'mod',
    'ref'
  ]);

  const ctx = useCarouselContext();

  return (
    <Box
      ref={local.ref}
      mod={[{ orientation: ctx.orientation }, local.mod]}
      {...ctx.getStyles('slide', { className: local.className, style: local.style, classNames: local.classNames, styles: local.styles })}
      {...others}
    />
  );
});

CarouselSlide.classes = classes;
CarouselSlide.displayName = '@empoleon/carousel/CarouselSlide';
