import { render, tests } from '@empoleon-tests/core';
import { Skeleton, SkeletonProps, SkeletonStylesNames } from './Skeleton';

const defaultProps: SkeletonProps = {};

describe('@empoleon/core/Skeleton', () => {
  tests.itSupportsSystemProps<SkeletonProps, SkeletonStylesNames>({
    component: Skeleton,
    props: defaultProps,
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
    displayName: '@empoleon/core/Skeleton',
    stylesApiSelectors: ['root'],
  });

  it('sets data-visible attribute based on visible prop', () => {
    const { rerender, container } = render(<Skeleton visible={false} />);
    expect(container.querySelector('.empoleon-Skeleton-root')).not.toHaveAttribute('data-visible');

    rerender(<Skeleton visible />);
    expect(container.querySelector('.empoleon-Skeleton-root')).toHaveAttribute('data-visible');
  });

  it('sets data-animate attribute based on animate prop', () => {
    const { rerender, container } = render(<Skeleton animate={false} />);
    expect(container.querySelector('.empoleon-Skeleton-root')).not.toHaveAttribute('data-animate');

    rerender(<Skeleton animate />);
    expect(container.querySelector('.empoleon-Skeleton-root')).toHaveAttribute('data-animate');
  });
});
