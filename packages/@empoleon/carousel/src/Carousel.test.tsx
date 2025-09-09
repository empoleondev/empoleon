import { render, screen, tests, userEvent } from '@empoleon-tests/core';
import { Carousel, CarouselProps, CarouselStylesNames } from './Carousel';
import { JSX } from 'solid-js';

describe('@empoleon/carousel/Carousel', () => {
  tests.itSupportsSystemProps<CarouselProps, CarouselStylesNames>({
    component: Carousel,
    props: () => ({
      withIndicators: true,
      children: (() => <>
        <Carousel.Slide>1</Carousel.Slide>
        <Carousel.Slide>2</Carousel.Slide>
        <Carousel.Slide>3</Carousel.Slide>
        <Carousel.Slide>4</Carousel.Slide>
      </>) as unknown as JSX.Element,
    }),
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/carousel/Carousel',
    stylesApiSelectors: [
      'root',
      'container',
      'control',
      'controls',
      'indicators',
      'slide',
      'viewport',
    ],
  });

  it('calls onNextSlide and onPreviousSlide when next/previous buttons are clicked', async () => {
    const onNextSlide = vi.fn();
    const onPreviousSlide = vi.fn();

    render(() =>
      <Carousel
        nextControlProps={{ 'aria-label': 'Next slide' }}
        previousControlProps={{ 'aria-label': 'Previous slide' }}
        onNextSlide={onNextSlide}
        onPreviousSlide={onPreviousSlide}
      />
    );

    await userEvent.click(screen.getByLabelText('Next slide'));
    expect(onNextSlide).toHaveBeenCalledTimes(1);
    expect(onPreviousSlide).toHaveBeenCalledTimes(0);

    await userEvent.click(screen.getByLabelText('Previous slide'));
    expect(onNextSlide).toHaveBeenCalledTimes(1);
    expect(onPreviousSlide).toHaveBeenCalledTimes(1);
  });

  it('renders controls if withControls is true', () => {
    const { container } = render(() =><Carousel withControls />);
    expect(container.querySelector('.empoleon-Carousel-controls')).toBeInTheDocument();
  });

  it('does not render controls if withControls is false', () => {
    const { container } = render(() =><Carousel withControls={false} />);
    expect(container.querySelector('.empoleon-Carousel-controls')).not.toBeInTheDocument();
  });

  it('renders indicators if withIndicators is true', () => {
    const { container } = render(() =><Carousel withIndicators />);
    expect(container.querySelector('.empoleon-Carousel-indicators')).toBeInTheDocument();
  });

  it('does not render indicators if withIndicators is false', () => {
    const { container } = render(() =><Carousel withIndicators={false} />);
    expect(container.querySelector('.empoleon-Carousel-indicators')).not.toBeInTheDocument();
  });

  it('supports custom next/previous controls icons', () => {
    render(() =><Carousel nextControlIcon="Next icon" previousControlIcon="Previous icon" />);
    expect(screen.getByText('Next icon')).toBeInTheDocument();
    expect(screen.getByText('Previous icon')).toBeInTheDocument();
  });
});
