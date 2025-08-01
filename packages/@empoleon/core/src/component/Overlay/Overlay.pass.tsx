import { render, tests } from '@empoleon-tests/core';
import { Overlay, OverlayProps, OverlayStylesNames } from './Overlay';

const defaultProps: OverlayProps = {};

describe('@empoleon/core/Overlay', () => {
  tests.itSupportsSystemProps<OverlayProps, OverlayStylesNames>({
    component: Overlay,
    props: defaultProps,
    mod: true,
    polymorphic: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Overlay',
    stylesApiSelectors: ['root'],
  });

  it('sets data-fixed attribute based on fixed prop', () => {
    const { container, rerender } = render(() => <Overlay fixed>test</Overlay>);
    expect(container.querySelector('.empoleon-Overlay-root')).toHaveAttribute('data-fixed');

    rerender(() => <Overlay fixed={false}>test</Overlay>);
    expect(container.querySelector('.empoleon-Overlay-root')).not.toHaveAttribute('data-fixed');
  });

  it('sets data-center attribute based on center prop', () => {
    const { container, rerender } = render(() => <Overlay center>test</Overlay>);
    expect(container.querySelector('.empoleon-Overlay-root')).toHaveAttribute('data-center');

    rerender(() => <Overlay center={false}>test</Overlay>);
    expect(container.querySelector('.empoleon-Overlay-root')).not.toHaveAttribute('data-center');
  });
});
