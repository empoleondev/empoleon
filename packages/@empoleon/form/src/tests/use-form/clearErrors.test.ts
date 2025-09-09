import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('clears errors when clearErrors handler is called', () => {
    const hook = renderHook(() => useForm({ mode, initialErrors: { a: 1, b: 2 } }));
    expect(hook.result.errors).toStrictEqual({ a: 1, b: 2 });
    hook.result.clearErrors();
    expect(hook.result.errors).toStrictEqual({});
  });
}

describe('@empoleon/form/clearErrors-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/clearErrors-uncontrolled', () => {
  tests('uncontrolled');
});
