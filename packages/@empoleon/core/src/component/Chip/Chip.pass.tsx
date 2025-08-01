import { render, tests } from '@empoleon-tests/core';
import { Chip, ChipProps, ChipStylesNames } from './Chip';

const defaultProps: ChipProps = {
  value: 'test-value',
  children: 'test-chip',
  checked: true,
};

describe('@empoleon/core/Chip', () => {
  tests.axe([() => <Chip {...defaultProps} />]);

  tests.itSupportsSystemProps<ChipProps, ChipStylesNames>({
    component: Chip,
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
    refType: HTMLInputElement,
    displayName: '@empoleon/core/Chip',
    stylesApiSelectors: ['root', 'iconWrapper', 'checkIcon', 'input', 'label'],
  });

  tests.itSupportsFocusEvents({
    component: Chip,
    props: defaultProps,
    selector: 'input',
  });

  it('displays check icon when checked prop is true', () => {
    const { rerender, container } = render(() => <Chip {...defaultProps} checked />);
    expect(container.querySelectorAll('.empoleon-Chip-checkIcon')).toHaveLength(1);

    rerender(() => <Chip {...defaultProps} checked={false} />);
    expect(container.querySelectorAll('.empoleon-Chip-checkIcon')).toHaveLength(0);
  });

  it('supports rootRef', () => {
    let ref;
    render(() => <Chip {...defaultProps} rootRef={(el) => ref = el} />);
    expect(ref).toBeInstanceOf(HTMLDivElement);
  });
});
