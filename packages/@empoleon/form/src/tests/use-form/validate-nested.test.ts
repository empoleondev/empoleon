import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('validates object with nested values', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        clearInputErrorOnChange: false,
        initialValues: {
          a: { b: { c: 1 } },
        },
        validate: {
          a: { b: { c: (value) => (value === 1 ? 'error-c' : null) } },
        },
      })
    );

    expect(hook.result.errors).toStrictEqual({});

    expect(hook.result.validate()).toStrictEqual({
      hasErrors: true,
      errors: { 'a.b.c': 'error-c' },
    });

    expect(hook.result.errors).toStrictEqual({ 'a.b.c': 'error-c' });

    hook.result.setFieldValue('a.b.c', 2);
    expect(hook.result.errors).toStrictEqual({ 'a.b.c': 'error-c' });

    expect(hook.result.validate()).toStrictEqual({
      hasErrors: false,
      errors: {},
    });
    expect(hook.result.errors).toStrictEqual({});
  });

  it('validates array with nested values', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        clearInputErrorOnChange: false,
        initialValues: { a: [{ b: 1 }, { b: 1 }, { b: 3 }] },
        validate: { a: { b: (value) => (value < 2 ? 'error-b' : null) } },
      })
    );

    expect(hook.result.errors).toStrictEqual({});

    expect(hook.result.validate()).toStrictEqual({
      hasErrors: true,
      errors: { 'a.0.b': 'error-b', 'a.1.b': 'error-b' },
    });

    expect(hook.result.errors).toStrictEqual({ 'a.0.b': 'error-b', 'a.1.b': 'error-b' });

    hook.result.setFieldValue('a.0.b', 4);
    hook.result.setFieldValue('a.1.b', 5);

    expect(hook.result.errors).toStrictEqual({ 'a.0.b': 'error-b', 'a.1.b': 'error-b' });

    expect(hook.result.validate()).toStrictEqual({
      hasErrors: false,
      errors: {},
    });

    expect(hook.result.errors).toStrictEqual({});
  });
}

describe('@empoleon/form/validate with nested rules controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/validate with nested rules uncontrolled', () => {
  tests('uncontrolled');
});
