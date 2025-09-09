import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('validates root property on change', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        validateInputOnChange: true,
        initialValues: { a: '', b: '' },
        validate: {
          a: (value) => (value.length < 2 ? 'error-a' : null),
          b: (value) => (value.length < 2 ? 'error-b' : null),
        },
      })
    );

    expect(hook.result.errors).toStrictEqual({});

    hook.result.setFieldValue('a', '1');
    expect(hook.result.errors).toStrictEqual({ a: 'error-a' });

    hook.result.setFieldValue('b', '1');
    expect(hook.result.errors).toStrictEqual({ a: 'error-a', b: 'error-b' });

    hook.result.setFieldValue('a', 'valid');
    hook.result.setFieldValue('b', 'valid');

    expect(hook.result.errors).toStrictEqual({});
  });

  it('validates only specified fields', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        validateInputOnChange: ['a'],
        initialValues: { a: '', b: '' },
        validate: {
          a: (value) => (value.length < 2 ? 'error-a' : null),
          b: (value) => (value.length < 2 ? 'error-b' : null),
        },
      })
    );

    expect(hook.result.errors).toStrictEqual({});

    hook.result.setFieldValue('a', '1');
    expect(hook.result.errors).toStrictEqual({ a: 'error-a' });

    hook.result.setFieldValue('b', '1');
    expect(hook.result.errors).toStrictEqual({ a: 'error-a' });

    hook.result.setFieldValue('a', 'valid');
    hook.result.setFieldValue('b', 'valid');

    expect(hook.result.errors).toStrictEqual({});
  });

  it('validates nested property on change', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        validateInputOnChange: true,
        initialValues: { nested: { a: '', b: '' } },
        validate: {
          nested: {
            a: (value) => (value.length < 2 ? 'error-a' : null),
            b: (value) => (value.length < 2 ? 'error-b' : null),
          },
        },
      })
    );

    expect(hook.result.errors).toStrictEqual({});

    hook.result.setFieldValue('nested.a', '1');
    expect(hook.result.errors).toStrictEqual({ 'nested.a': 'error-a' });

    hook.result.setFieldValue('nested.b', '1');
    expect(hook.result.errors).toStrictEqual({
      'nested.a': 'error-a',
      'nested.b': 'error-b',
    });

    hook.result.setFieldValue('nested.a', 'valid');
    hook.result.setFieldValue('nested.b', 'valid');

    expect(hook.result.errors).toStrictEqual({});
  });
}

describe('@empoleon/form/validateInputOnChange-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/validateInputOnChange-uncontrolled', () => {
  tests('uncontrolled');
});
