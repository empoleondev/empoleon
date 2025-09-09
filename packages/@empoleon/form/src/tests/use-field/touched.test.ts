import { renderHook } from '@solidjs/testing-library';
import { useField } from '../../use-field';

describe('@empoleon/form/use-field/touched', () => {
  it('sets correct initial touched state', () => {
    const hook = renderHook(() => useField({ initialValue: 'test', initialTouched: true }));
    expect(hook.result.isTouched()).toBe(true);
  });

  it('updates touched state when the input is focused', () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));
    expect(hook.result.isTouched()).toBe(false);
    hook.result.getInputProps().onFocus?.();
    expect(hook.result.isTouched()).toBe(true);
  });

  it('resets touched state with resetTouched handler', () => {
    const hook = renderHook(() => useField({ initialValue: 'test', initialTouched: true }));
    expect(hook.result.isTouched()).toBe(true);
    hook.result.resetTouched();
    expect(hook.result.isTouched()).toBe(false);
  });

  it('resets touched state with reset handler', () => {
    const hook = renderHook(() => useField({ initialValue: 'test', initialTouched: true }));
    expect(hook.result.isTouched()).toBe(true);
    hook.result.reset();
    expect(hook.result.isTouched()).toBe(false);
  });
});
