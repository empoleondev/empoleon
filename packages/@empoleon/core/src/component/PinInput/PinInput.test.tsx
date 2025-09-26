import { fireEvent } from '@solidjs/testing-library';
import userEvent from '@testing-library/user-event';
import { render, tests } from '@empoleon-tests/core';
import { PinInput, PinInputProps, PinInputStylesNames } from './PinInput';

const defaultProps: PinInputProps = {};

describe('@empoleon/core/PinInput', () => {
  tests.axe([() => <PinInput {...defaultProps} aria-label="Test label" />]);

  tests.itSupportsSystemProps<PinInputProps, PinInputStylesNames>({
    component: PinInput,
    props: () => defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLInputElement,
    displayName: '@empoleon/core/PinInput',
    stylesApiSelectors: ['root', 'pinInput', 'input'],
    providerStylesApi: false,
  });

  it('renders correct number of inputs based on length prop', () => {
    const { container } = render(() => <PinInput {...defaultProps} length={5} />);
    expect(container.querySelectorAll('.empoleon-PinInput-input')).toHaveLength(5);
  });

  it('onChange is called after typing', () => {
    const spy = vi.fn();
    const { container } = render(() => <PinInput type="number" length={6} onChange={spy} />);

    fireEvent.input(container.querySelectorAll('.empoleon-PinInput-input')[1], {
      target: {
        value: '1',
      },
    });

    expect(spy).toHaveBeenCalled();
  });

  it('onComplete is called on last input', () => {
    const spy = vi.fn();
    const { container } = render(() => <PinInput {...defaultProps} onComplete={spy} />);

    const firstInput = container.querySelector('.empoleon-PinInput-input') as HTMLInputElement;

    fireEvent.focus(firstInput);
    fireEvent.paste(firstInput, {
      clipboardData: {
        getData: () => '1111'
      }
    });

    expect(spy).toHaveBeenCalledWith('1111');
  });

  it('focus first input on mount with `autoFocus` property', () => {
    const { container } = render(() => <PinInput length={6} autoFocus />);
    const firstInput = container.querySelectorAll('.empoleon-PinInput-input')[0];
    expect(firstInput).toHaveAttribute('auto-focus');
  });

  it('stay focused on last element on initial backspace press', async () => {
    const { container } = render(() => <PinInput {...defaultProps} length={5} />);
    expect(container.querySelectorAll('.empoleon-PinInput-input')).toHaveLength(5);

    container.querySelectorAll('.empoleon-PinInput-input').forEach((element, key) => {
      fireEvent.change(element, { target: { value: key } });
    });

    await userEvent.keyboard('{Backspace}');
    const firstInput = container.querySelectorAll('.empoleon-PinInput-input')[4];
    expect(firstInput).toHaveAttribute('auto-focus');
  });

  it('inputs except the last element should not need two backspace press to shift focus to prev element', async () => {
    const { container } = render(() => <PinInput {...defaultProps} length={5} />);
    expect(container.querySelectorAll('.empoleon-PinInput-input')).toHaveLength(5);

    const inputs = container.querySelectorAll('.empoleon-PinInput-input');

    inputs.forEach((element, key) => {
      fireEvent.input(element, { target: { value: key.toString() } });
    });

    const lastInput = inputs[4];
    fireEvent.focus(lastInput);
    expect(lastInput).toHaveAttribute('auto-focus');

    fireEvent.keyDown(lastInput, { key: 'Backspace' });
    const fourthInput = inputs[3];
    expect(fourthInput).toHaveAttribute('auto-focus');

    fireEvent.keyDown(fourthInput, { key: 'Backspace' });
    const thirdInput = inputs[2];
    expect(thirdInput).toHaveAttribute('auto-focus');

    fireEvent.keyDown(thirdInput, { key: 'Backspace' });
    const secondInput = inputs[1];
    expect(secondInput).toHaveAttribute('auto-focus');

    fireEvent.keyDown(secondInput, { key: 'Backspace' });
    const firstInput = inputs[0];
    expect(firstInput).toHaveAttribute('auto-focus');

    fireEvent.keyDown(firstInput, { key: 'Backspace' });
    expect(firstInput).toHaveAttribute('auto-focus');
  });

  it('inputs will be filled when the value is bigger than 2 chars(ex: Gboard paste action from keypad)', async () => {
    const spy = vi.fn();
    const { container } = render(() => <PinInput {...defaultProps} onComplete={spy} length={6} />);

    const element = container.querySelectorAll('.empoleon-PinInput-input')[0];

    const expectedValue = '123456';
    fireEvent.input(element, { target: { value: expectedValue } });
    expect(spy).toHaveBeenCalledWith(expectedValue);
  });

  it('display only one character in an input', () => {
    const { container } = render(() => <PinInput length={6} />);
    expect(
      (container.querySelectorAll('.empoleon-PinInput-input')[0] as HTMLInputElement).value.length
    ).toBeLessThan(2);
  });

  it('display only one character in an input with `defaultValue` property', () => {
    const { container } = render(() => <PinInput length={6} defaultValue="123456" />);
    expect(
      (container.querySelectorAll('.empoleon-PinInput-input')[2] as HTMLInputElement).value.length
    ).toBe(1);
  });
});
