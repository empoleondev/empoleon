import { render, tests, userEvent } from '@empoleon-tests/core';
import { Pill, PillProps, PillStylesNames } from './Pill';

const defaultProps: PillProps = {
  children: 'test-pill',
  withRemoveButton: true,
};

describe('@empoleon/core/Pill', () => {
  tests.axe([() => <Pill {...defaultProps} />]);

  tests.itSupportsSystemProps<PillProps, PillStylesNames>({
    component: Pill,
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
    displayName: '@empoleon/core/Pill',
    stylesApiSelectors: ['root', 'label', 'remove'],
  });

  it('renders remove button if withRemoveButton prop is true', () => {
    const { container, rerender } = render(() => <Pill {...defaultProps} withRemoveButton />);
    expect(container.querySelector('.empoleon-Pill-remove')).toBeInTheDocument();

    rerender(() => <Pill {...defaultProps} withRemoveButton={false} />);
    expect(container.querySelector('.empoleon-Pill-remove')).not.toBeInTheDocument();
  });

  it('supports removeButtonProps', () => {
    const { container } = render(
      () => <Pill removeButtonProps={{ 'data-test': true } as any} withRemoveButton />
    );
    expect(container.querySelector('[data-test="true"]')).toBeInTheDocument();
  });

  it('supports onClick in removeButtonProps', async () => {
    const spy = vi.fn();
    const { container } = render(() => <Pill removeButtonProps={{ onClick: spy }} withRemoveButton />);
    await userEvent.click(container.querySelector('.empoleon-Pill-remove')!);
    expect(spy).toHaveBeenCalled();
  });

  it('supports onMouseDown in removeButtonProps', async () => {
    const spy = vi.fn();
    const { container } = render(
      () => <Pill removeButtonProps={{ onMouseDown: spy }} withRemoveButton />
    );
    await userEvent.click(container.querySelector('.empoleon-Pill-remove')!);
    expect(spy).toHaveBeenCalled();
  });

  it('sets data-with-remove attribute based on withRemoveButton prop', () => {
    const { container, rerender } = render(() => <Pill {...defaultProps} withRemoveButton />);
    expect(container.querySelector('[data-with-remove]')).toBeInTheDocument();

    rerender(() => <Pill {...defaultProps} withRemoveButton={false} />);
    expect(container.querySelector('[data-with-remove]')).not.toBeInTheDocument();
  });
});
