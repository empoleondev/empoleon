import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('accepts initial touched state', () => {
    const hook = renderHook(() => useForm({ mode, initialTouched: { a: true, b: false } }));
    expect(hook.result.isTouched('a')).toBe(true);
    expect(hook.result.isTouched('b')).toBe(false);
    expect(hook.result.isTouched()).toBe(true);
  });

  it('sets field as touched if value changes', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1 } }));
    expect(hook.result.isTouched('a')).toBe(false);
    expect(hook.result.isTouched()).toBe(false);

    hook.result.setFieldValue('a', 5);
    expect(hook.result.isTouched('a')).toBe(true);
    expect(hook.result.isTouched()).toBe(true);
  });

  it('allows to set touched state with setTouched handler', () => {
    const hook = renderHook(() => useForm({ mode }));
    expect(hook.result.isTouched()).toBe(false);
    expect(hook.result.isTouched('a')).toBe(false);

    hook.result.setTouched({ a: true });
    expect(hook.result.isTouched()).toBe(true);
    expect(hook.result.isTouched('a')).toBe(true);
  });

  it('resets status with resetTouched handler', () => {
    const hook = renderHook(() => useForm({ mode, initialTouched: { a: true } }));
    expect(hook.result.isTouched()).toBe(true);

    hook.result.resetTouched();
    expect(hook.result.isTouched()).toBe(false);
  });

  it('sets field as touched with getInputProps onFocus', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1 } }));
    expect(hook.result.isTouched()).toBe(false);
    expect(hook.result.isTouched('a')).toBe(false);

    hook.result.getInputProps('a').onFocus();
    expect(hook.result.isTouched()).toBe(true);
    expect(hook.result.isTouched('a')).toBe(true);
  });

  it('does not set field as touched if touchTrigger is focus and field was changed with form.setFieldValue', () => {
    const hook = renderHook(() =>
      useForm({ mode, initialValues: { a: 1 }, touchTrigger: 'focus' })
    );
    expect(hook.result.isTouched()).toBe(false);
    expect(hook.result.isTouched('a')).toBe(false);

    hook.result.setFieldValue('a', 5);
    expect(hook.result.isTouched()).toBe(false);
    expect(hook.result.isTouched('a')).toBe(false);

    hook.result.getInputProps('a').onFocus();
    expect(hook.result.isTouched()).toBe(true);
  });
}

describe('@empoleon/form/touched-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/touched-uncontrolled', () => {
  tests('uncontrolled');
});
