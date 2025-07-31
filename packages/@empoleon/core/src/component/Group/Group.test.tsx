import { render, screen, tests } from '@empoleon-tests/core';
import { Group, GroupProps, GroupStylesNames } from './Group';

const defaultProps: GroupProps = {};

describe('@empoleon/core/Group', () => {
  tests.itSupportsSystemProps<GroupProps, GroupStylesNames>({
    component: Group,
    props: defaultProps,
    mod: true,
    polymorphic: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Group',
    stylesApiSelectors: ['root'],
  });

  it('sets data-grow attribute based on grow prop', () => {
    const { rerender } = render(() => <Group grow>test</Group>);
    expect(screen.getByText('test')).toHaveAttribute('data-grow');

    rerender(() => <Group>test</Group>);
    expect(screen.getByText('test')).not.toHaveAttribute('data-grow');
  });

  it('does not render falsy children', () => {
    const children = [undefined, null, <div />];
    const { container } = render(() => <Group>{children}</Group>);
    expect(container.querySelectorAll('.empoleon-Group-root > *')).toHaveLength(1);
  });
});
