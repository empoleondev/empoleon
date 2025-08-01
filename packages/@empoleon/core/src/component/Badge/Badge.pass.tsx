import { render, tests } from '@empoleon-tests/core';
import { Badge, BadgeProps, BadgeStylesNames } from './Badge';

const defaultProps: BadgeProps = {
  leftSection: 'L',
  rightSection: 'R',
};

describe('@empoleon/core/Badge', () => {
  tests.itSupportsSystemProps<BadgeProps, BadgeStylesNames>({
    component: Badge,
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
    displayName: '@empoleon/core/Badge',
    stylesApiSelectors: ['root', 'section', 'label'],
  });

  it('sets data-block attribute on root element if fullWidth prop is set', () => {
    const { rerender, container } = render(() => <Badge {...defaultProps} fullWidth />);
    expect(container.querySelector('.empoleon-Badge-root')).toHaveAttribute('data-block');

    rerender(() => <Badge {...defaultProps} fullWidth={false} />);
    expect(container.querySelector('.empoleon-Badge-root')).not.toHaveAttribute('data-block');
  });

  it('renders given left and right sections', () => {
    const { container } = render(
      () => <Badge {...defaultProps} leftSection="test-left" rightSection="test-right" />
    );

    const leftSection = container.querySelector('.empoleon-Badge-section[data-position="left"]');
    const rightSection = container.querySelector('.empoleon-Badge-section[data-position="right"]');

    expect(leftSection?.textContent).toBe('test-left');
    expect(rightSection?.textContent).toBe('test-right');
  });
});
