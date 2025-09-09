import { renderHook, waitFor } from '@solidjs/testing-library';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

const asyncHandler = (values, event) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 10);
  });
};

function tests(mode: FormMode) {
  it('sets submitting when form.onSubmit function receives async handler', async () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1, b: 2 } }));

    expect(hook.result.submitting).toBe(false);

    const event = { preventDefault: vi.fn(), type: 'submit' };
    const submitPromise = hook.result.onSubmit(asyncHandler)(event);

    expect(hook.result.submitting).toBe(true);

    vi.runAllTimers();
    await submitPromise;

    expect(hook.result.submitting).toBe(false);
  });

  it('sets submitting when form.onSubmit function receives async handler', async () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1, b: 2 } }));

    expect(hook.result.submitting).toBe(false);

    const event = { preventDefault: vi.fn(), type: 'submit' };
    const submitPromise = hook.result.onSubmit(asyncHandler)(event);

    expect(hook.result.submitting).toBe(true);

    vi.runAllTimers();
    await submitPromise;

    expect(hook.result.submitting).toBe(false);
  });

  it('allows to set submitting state manually', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1, b: 2 } }));
    expect(hook.result.submitting).toBe(false);

    hook.result.setSubmitting(true);

    expect(hook.result.submitting).toBe(true);

    hook.result.setSubmitting(false);

    expect(hook.result.submitting).toBe(false);
  });
}

describe('@empoleon/form/submitting-controlled', () => {
  beforeAll(() => vi.useFakeTimers());
  afterAll(() => vi.useRealTimers());
  tests('controlled');
});

describe('@empoleon/form/submitting-uncontrolled', () => {
  beforeAll(() => vi.useFakeTimers());
  afterAll(() => vi.useRealTimers());
  tests('uncontrolled');
});
