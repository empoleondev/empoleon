import { createSignal, For, JSX } from 'solid-js';
import { DEFAULT_THEME, EmpoleonProvider, EmpoleonSize } from '../../core';
import { Button } from '../Button';
import { PinInput } from './PinInput';

export default {
  title: 'PinInput',
  decorators: [
    (Story: () => JSX.Element) => (
      <EmpoleonProvider>
        <Story />
      </EmpoleonProvider>
    ),
  ],
};

export function Usage() {
  const [value, setValue] = createSignal('');
  return (
    <div style={{ 'padding': '40px' }}>
      <PinInput id="test-id" value={value()} onChange={setValue} />
      <Button onClick={() => setValue('')}>Reset</Button>
    </div>
  );
}

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export function AsyncReset() {
  const [value, setValue] = createSignal('');
  const [errorMessage, setErrorMessage] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);

  const login = async (code: string) => {
    /* ... */
    await sleep(500);
    /* ... */

    throw new Error(`CodeMismatchException: ${code} is not valid`);
  };

  const handleChange = async (newValue: string) => {
    setValue(newValue);

    if (newValue.length !== 4) {
      return;
    }

    setIsLoading(true);

    await login(newValue)
      .then(() => {
        setErrorMessage('');
      })
      .catch((error: any) => {
        setValue('');
        if (error instanceof Error) {
          setErrorMessage(error.message);
        }
      });

    setIsLoading(false);
  };

  return (
    <>
      <PinInput disabled={isLoading()} onChange={handleChange} value={value()} />
      <div class="text-red-500">{errorMessage()}</div>
      <pre>{JSON.stringify({ value }, null, 2)}</pre>
    </>
  );
}

export function InputRef() {
  let inputRef: HTMLInputElement | null = null;

  return (
    <div style={{ 'padding': '40px' }}>
      <PinInput ref={inputRef} />
      <Button onClick={() => inputRef?.focus()}>Focus first input</Button>
    </div>
  );
}

export function Unstyled() {
  return (
    <div style={{ 'padding': '40px' }}>
      <PinInput unstyled />
    </div>
  );
}

export function OnComplete() {
  const [value, setValue] = createSignal('');
  return (
    <div style={{ 'padding': '40px' }}>
      <PinInput length={5} onComplete={setValue} />
      Pin: {value()}
    </div>
  );
}

export function ResetControlled() {
  const [value, setValue] = createSignal('1234');

  return (
    <div style={{ 'padding': '40px' }}>
      <PinInput value={value()} onChange={setValue} />
      <Button onClick={() => setValue('')}>Reset</Button>
    </div>
  );
}

export function ReadOnly() {
  return (
    <div style={{ 'padding': '40px' }}>
      <PinInput readOnly />
    </div>
  );
}

export function Autofocus() {
  return (
    <div style={{ 'padding': '40px' }}>
      <PinInput autoFocus />
    </div>
  );
}

export function Controlled() {
  const [value, setValue] = createSignal('');
  return (
    <div style={{ 'padding': '40px' }}>
      <PinInput value={value()} onChange={setValue} />
      Value: {value()}
    </div>
  );
}

export function Mask() {
  const [value, setValue] = createSignal('');
  return (
    <div style={{ 'padding': '40px' }}>
      <PinInput value={value()} onChange={setValue} mask />
      Value: {value()}
    </div>
  );
}

export function Sizes() {
  const sizes = Object.keys(DEFAULT_THEME.fontSizes);
  return <div style={{ 'padding': '40px' }}>
    <For each={sizes}>
      {(size) => (
        <PinInput size={size as EmpoleonSize} mt="md" />
      )}
    </For>
  </div>;
}

export function Number() {
  return (
    <div style={{ 'padding': '40px' }}>
      <PinInput type="number" />
    </div>
  );
}

export function Tab() {
  return (
    <div style={{ 'padding': '40px' }}>
      <PinInput />
      <PinInput mt="md" />
    </div>
  );
}
