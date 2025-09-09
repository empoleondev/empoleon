import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('returns correct form validation state', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        initialValues: { a: 1 },
        validate: {
          a: (value) => (value < 2 ? 'error' : null),
        },
      })
    );

    expect(hook.result.isValid()).toBe(false);
    expect(hook.result.errors).toStrictEqual({});

    hook.result.setFieldValue('a', 2);
    expect(hook.result.isValid()).toBe(true);
  });

  it('returns correct field validation state', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        initialValues: { a: 1, b: 2 },
        validate: {
          a: (value) => (value < 2 ? 'error' : null),
        },
      })
    );

    expect(hook.result.isValid('a')).toBe(false);
    expect(hook.result.isValid('b')).toBe(true);
    expect(hook.result.errors).toStrictEqual({});

    hook.result.setFieldValue('a', 2);
    expect(hook.result.isValid('a')).toBe(true);
    expect(hook.result.isValid('b')).toBe(true);
  });
}

describe('@empoleon/form/isValid-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/isValid-uncontrolled', () => {
  tests('uncontrolled');
});
