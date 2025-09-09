import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('clears error of given field with clearFieldError handler', () => {
    const hook = renderHook(() => useForm({ mode, initialErrors: { a: 1, b: 2 } }));
    expect(hook.result.errors).toStrictEqual({ a: 1, b: 2 });

    hook.result.clearFieldError('a');
    expect(hook.result.errors).toStrictEqual({ b: 2 });

    hook.result.clearFieldError('b');
    expect(hook.result.errors).toStrictEqual({});
  });
}

describe('@empoleon/form/clearFieldError-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/clearFieldError-uncontrolled', () => {
  tests('uncontrolled');
});
