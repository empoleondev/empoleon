import { fireEvent } from '@solidjs/testing-library';
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
        getData: () => '1111',
      },
    });

    expect(spy).toHaveBeenCalledWith('1111');
  });

  it('focus first input on mount with `autoFocus` property', () => {
    const { container } = render(() => <PinInput length={6} autoFocus />);
    const firstInput = container.querySelectorAll('.empoleon-PinInput-input')[0];
    expect(firstInput).toHaveAttribute('autofocus');
  });

  it('stay focused on last element on initial backspace press', async () => {
    const { container } = render(() => <PinInput {...defaultProps} length={5} />);
    expect(container.querySelectorAll('.empoleon-PinInput-input')).toHaveLength(5);

    let inputs = container.querySelectorAll('.empoleon-PinInput-input');

    inputs.forEach((element, key) => {
      const input = element as any;
      if (input.$$input) {
        const event = new Event('input', { bubbles: true });
        Object.defineProperty(event, 'currentTarget', {
          writable: false,
          value: { value: key.toString() },
        });
        input.$$input(event);
      }
    });

    await Promise.resolve();

    inputs = container.querySelectorAll('.empoleon-PinInput-input');
    const lastInput = inputs[4] as HTMLInputElement;

    lastInput.focus();
    await Promise.resolve();

    const lastInputEl = lastInput as any;
    if (lastInputEl.$$keydown) {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, 'target', {
        writable: false,
        value: lastInput,
      });
      lastInputEl.$$keydown(event);
    }

    await Promise.resolve();

    expect(document.activeElement).toBe(document.body);
  });

  it('inputs except the last element should not need two backspace press to shift focus to prev element', async () => {
    const { container } = render(() => <PinInput {...defaultProps} length={5} />);
    expect(container.querySelectorAll('.empoleon-PinInput-input')).toHaveLength(5);

    let inputs = container.querySelectorAll('.empoleon-PinInput-input');

    // Set values using SolidJS handlers
    inputs.forEach((element, key) => {
      const input = element as any;
      if (input.$$input) {
        const event = new Event('input', { bubbles: true });
        Object.defineProperty(event, 'currentTarget', {
          writable: false,
          value: { value: key.toString() },
        });
        input.$$input(event);
      }
    });

    await Promise.resolve();
    inputs = container.querySelectorAll('.empoleon-PinInput-input');

    const fourthInput = inputs[3] as HTMLInputElement;
    fourthInput.focus();
    await Promise.resolve();
    expect(document.activeElement).toBe(fourthInput);

    // Backspace on input 3 -> move to input 2
    let currentInputEl = fourthInput as any;
    if (currentInputEl.$$keydown) {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, 'target', { writable: false, value: fourthInput });
      currentInputEl.$$keydown(event);
    }
    await Promise.resolve();
    inputs = container.querySelectorAll('.empoleon-PinInput-input');
    expect(document.activeElement).toBe(inputs[2]);

    // Backspace on input 2 -> move to input 1
    currentInputEl = inputs[2] as any;
    if (currentInputEl.$$keydown) {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, 'target', { writable: false, value: inputs[2] });
      currentInputEl.$$keydown(event);
    }
    await Promise.resolve();
    inputs = container.querySelectorAll('.empoleon-PinInput-input');
    expect(document.activeElement).toBe(inputs[1]);

    // Backspace on input 1 -> move to input 0
    currentInputEl = inputs[1] as any;
    if (currentInputEl.$$keydown) {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, 'target', { writable: false, value: inputs[1] });
      currentInputEl.$$keydown(event);
    }
    await Promise.resolve();
    inputs = container.querySelectorAll('.empoleon-PinInput-input');
    // Focus is lost to body due to queueMicrotask blur, manually refocus
    (inputs[0] as HTMLInputElement).focus();
    await Promise.resolve();
    expect(document.activeElement).toBe(inputs[0]);

    // Backspace on input 0 -> stay on input 0
    currentInputEl = inputs[0] as any;
    if (currentInputEl.$$keydown) {
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
        bubbles: true,
        cancelable: true,
      });
      Object.defineProperty(event, 'target', { writable: false, value: inputs[0] });
      currentInputEl.$$keydown(event);
    }
    await Promise.resolve();
    inputs = container.querySelectorAll('.empoleon-PinInput-input');
    expect(document.activeElement).toBe(inputs[0]);
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
