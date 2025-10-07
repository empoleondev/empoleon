import { render, screen, tests, userEvent } from '@empoleon-tests/core';
import { Chip } from '../Chip';
import { ChipGroup } from './ChipGroup';

const getChip = (index: number, type: 'radio' | 'checkbox') => screen.getAllByRole(type)[index];

const clickChip = (index: number, type: 'radio' | 'checkbox') =>
  userEvent.click(getChip(index, type));

describe('@empoleon/core/ChipGroup', () => {
  tests.axe([
    () => (
      <ChipGroup
        children={
          <>
            <Chip value="test-1">test-1</Chip>
            <Chip value="test-2">test-2</Chip>
            <Chip value="test-3">test-3</Chip>
          </>
        }
      />
    ),
  ]);

  it('sets chip type based on multiple prop', () => {
    const { container: multiple } = render(() => (
      <ChipGroup
        multiple
        children={
          <>
            <Chip value="test-1">test-1</Chip>
            <Chip value="test-2">test-2</Chip>
            <Chip value="test-3">test-3</Chip>
          </>
        }
        value={['1']}
      />
    ));
    const { container: single } = render(() => (
      <ChipGroup
        multiple={false}
        children={
          <>
            <Chip value="test-1">test-1</Chip>
            <Chip value="test-2">test-2</Chip>
            <Chip value="test-3">test-3</Chip>
          </>
        }
      />
    ));
    expect(multiple.querySelector('input')).toHaveAttribute('type', 'checkbox');
    expect(single.querySelector('input')).toHaveAttribute('type', 'radio');
  });

  it('supports uncontrolled state when multiple prop is false', async () => {
    render(() => (
      <ChipGroup
        children={
          <>
            <Chip value="test-1">test-1</Chip>
            <Chip value="test-2">test-2</Chip>
            <Chip value="test-3">test-3</Chip>
          </>
        }
      />
    ));
    expect(
      screen.getAllByRole('radio').every((chip) => chip.getAttribute('checked') === null)
    ).toBe(true);

    await clickChip(0, 'radio');
    expect(getChip(0, 'radio')).toBeChecked();

    await clickChip(1, 'radio');
    expect(getChip(1, 'radio')).toBeChecked();
    expect(getChip(0, 'radio')).not.toBeChecked();
  });

  it('supports uncontrolled state when multiple prop is true', async () => {
    render(() => (
      <ChipGroup
        children={
          <>
            <Chip value="test-1">test-1</Chip>
            <Chip value="test-2">test-2</Chip>
            <Chip value="test-3">test-3</Chip>
          </>
        }
        multiple
      />
    ));
    expect(
      screen.getAllByRole('checkbox').every((chip) => chip.getAttribute('checked') === null)
    ).toBe(true);

    await clickChip(0, 'checkbox');
    expect(getChip(0, 'checkbox')).toBeChecked();

    await clickChip(1, 'checkbox');
    expect(getChip(1, 'checkbox')).toBeChecked();
    expect(getChip(0, 'checkbox')).toBeChecked();

    await clickChip(1, 'checkbox');
    expect(getChip(1, 'checkbox')).not.toBeChecked();
    expect(getChip(0, 'checkbox')).toBeChecked();
  });

  it('supports controlled state when multiple prop is false', async () => {
    const spy = vi.fn();
    render(() => (
      <ChipGroup
        children={
          <>
            <Chip value="test-1">test-1</Chip>
            <Chip value="test-2">test-2</Chip>
            <Chip value="test-3">test-3</Chip>
          </>
        }
        value="test-1"
        onChange={spy}
      />
    ));
    await clickChip(1, 'radio');
    expect(spy).toHaveBeenLastCalledWith('test-2');
    await clickChip(2, 'radio');
    expect(spy).toHaveBeenLastCalledWith('test-3');
  });

  it('supports controlled state when multiple prop is true', async () => {
    const spy = vi.fn();
    render(() => (
      <ChipGroup
        children={
          <>
            <Chip value="test-1">test-1</Chip>
            <Chip value="test-2">test-2</Chip>
            <Chip value="test-3">test-3</Chip>
          </>
        }
        multiple
        onChange={spy}
        value={['test-2']}
      />
    ));
    userEvent.click(screen.getAllByRole('checkbox')[1]);
    await clickChip(1, 'checkbox');
    expect(spy).toHaveBeenLastCalledWith([]);
    await clickChip(2, 'checkbox');
    expect(spy).toHaveBeenLastCalledWith(['test-2', 'test-3']);
  });
});
