import { renderHook } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

function tests(mode: FormMode) {
  it('initializes form with given values with form.initialize', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1, b: 2 } }));
    expect(hook.result.getValues()).toStrictEqual({ a: 1, b: 2 });

    hook.result.initialize({ a: 3, b: 4 });
    expect(hook.result.getValues()).toStrictEqual({ a: 3, b: 4 });
    expect(hook.result.initialized).toBe(true);

    hook.result.setValues({ a: 1, b: 2 });
    hook.result.initialize({ a: 5, b: 6 });
    expect(hook.result.getValues()).toStrictEqual({ a: 1, b: 2 });
  });
}

describe('@empoleon/form/initialize-controlled', () => {
  tests('controlled');
});

describe('@empoleon/form/initialize-uncontrolled', () => {
  tests('uncontrolled');
});
