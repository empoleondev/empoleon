import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('filters out errors with undefined and null with setErrors handler', () => {
    const hook = renderHook(() => useForm({ mode }));
    hook.result.setErrors({ a: 1, b: undefined, c: null, d: 2 });
    expect(hook.result.errors).toStrictEqual({ a: 1, d: 2 });
  });
}

describe('@empoleon/form/setErrors-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/setErrors-uncontrolled', () => {
  tests('uncontrolled');
});
