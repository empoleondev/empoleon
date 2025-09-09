import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('validates all fields with validate handler', () => {
    const hook = renderHook(() =>
      useForm<{ banana: string; orange: string; bar: number }>({
        mode,
        initialValues: {
          banana: '',
          orange: '',
          bar: 42,
        },

        validate: {
          banana: (value) => (value !== 'test-banana' ? 'invalid banana' : null),
          orange: (value) => (value !== 'test-orange' ? 'invalid orange' : null),
        },
      })
    );

    expect(hook.result.errors).toStrictEqual({});

    const result = hook.result.validate();
    expect(result).toStrictEqual({
      hasErrors: true,
      errors: {
        banana: 'invalid banana',
        orange: 'invalid orange',
      },
    });

    expect(hook.result.errors).toStrictEqual({
      banana: 'invalid banana',
      orange: 'invalid orange',
    });

    hook.result.setFieldValue('banana', 'test-banana');
    const result1 = hook.result.validate();
    expect(result1).toStrictEqual({
      hasErrors: true,
      errors: { orange: 'invalid orange' },
    });

    expect(hook.result.errors).toStrictEqual({ orange: 'invalid orange' });

    hook.result.setFieldValue('orange', 'test-orange');
    const result2 = hook.result.validate();
    expect(result2).toStrictEqual({ hasErrors: false, errors: {} });

    expect(hook.result.errors).toStrictEqual({});
  });

  it('validates single field with validateField handler', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        initialValues: {
          banana: '',
          orange: '',
        },

        validate: {
          banana: (value) => (value !== 'test-banana' ? 'invalid banana' : null),
          orange: (value) => (value !== 'test-orange' ? 'invalid orange' : null),
        },
      })
    );

    const result = hook.result.validateField('banana');
    expect(result).toStrictEqual({ hasError: true, error: 'invalid banana' });

    expect(hook.result.errors).toStrictEqual({ banana: 'invalid banana' });

    hook.result.setFieldValue('banana', 'test-banana');
    const result1 = hook.result.validateField('banana');
    expect(result1).toStrictEqual({ hasError: false, error: null });

    expect(hook.result.errors).toStrictEqual({});
  });

  it('allows to validate values based on their path', () => {
    const hook = renderHook(() =>
      useForm({
        mode,
        initialValues: { a: [{ b: 1 }, { b: 2 }] },
        validate: {
          a: {
            b: (_value, _values, path) => (path === 'a.0.b' ? 'error' : null),
          },
        },
      })
    );

    const result = hook.result.validate();
    expect(result).toStrictEqual({
      hasErrors: true,
      errors: {
        'a.0.b': 'error',
      },
    });
  });
}

describe('@empoleon/form/validate with record rules controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/validate with record rules uncontrolled', () => {
  tests('uncontrolled');
});
