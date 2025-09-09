import { renderHook } from '@solidjs/testing-library';
import { useField } from '../../use-field';

describe('@empoleon/form/use-field/get-input-props', () => {
  it('returns correct props from getInputProps (controlled)', () => {
    const hook = renderHook(() => useField({ initialValue: 'test', initialError: 'test-error' }));
    expect(hook.result.getInputProps()).toStrictEqual({
      value: 'test',
      error: 'test-error',
      onChange: expect.any(Function),
      onBlur: expect.any(Function),
      onFocus: expect.any(Function),
    });
  });

  it('returns correct props from getInputProps (uncontrolled)', () => {
    const hook = renderHook(() =>
      useField({ mode: 'uncontrolled', initialValue: 'test', initialError: 'test-error' })
    );
    expect(hook.result.getInputProps()).toStrictEqual({
      defaultValue: 'test',
      error: 'test-error',
      onChange: expect.any(Function),
      onBlur: expect.any(Function),
      onFocus: expect.any(Function),
    });
  });

  it('updates value with onChange handler returned from getInputProps', () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));
    expect(hook.result.getValue()).toBe('test');
    hook.result.getInputProps().onChange('new value');
    expect(hook.result.getValue()).toBe('new value');
  });

  it('updates touched with onFocus handler returned from getInputProps', () => {
    const hook = renderHook(() => useField({ initialValue: 'test' }));
    expect(hook.result.isTouched()).toBe(false);
    hook.result.getInputProps().onFocus?.();
    expect(hook.result.isTouched()).toBe(true);
  });

  it('returns correct props for type="checkbox" (controlled)', () => {
    const hook = renderHook(() =>
      useField({ initialValue: false, type: 'checkbox', initialError: 'test-error' })
    );
    expect(hook.result.getInputProps()).toStrictEqual({
      checked: false,
      error: 'test-error',
      onChange: expect.any(Function),
      onBlur: expect.any(Function),
      onFocus: expect.any(Function),
    });
  });

  it('returns correct props for type="checkbox" (uncontrolled)', () => {
    const hook = renderHook(() =>
      useField({
        mode: 'uncontrolled',
        initialValue: false,
        type: 'checkbox',
        initialError: 'test-error',
      })
    );
    expect(hook.result.getInputProps()).toStrictEqual({
      defaultChecked: false,
      error: 'test-error',
      onChange: expect.any(Function),
      onBlur: expect.any(Function),
      onFocus: expect.any(Function),
    });
  });
});
