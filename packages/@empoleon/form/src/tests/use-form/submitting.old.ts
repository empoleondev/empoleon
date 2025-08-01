import { act, renderHook, waitFor } from '@testing-library/react';
import { FormMode } from '../../types';
import { useForm } from '../../use-form';

const asyncHandler = () => new Promise((resolve) => setTimeout(resolve, 10));

function tests(mode: FormMode) {
  it('sets submitting when form.onSubmit function receives async handler', async () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1, b: 2 } }));
    expect(hook.result.current.submitting).toBe(false);

    act(() => {
      hook.result.current.onSubmit(asyncHandler)();
    });

    expect(hook.result.current.submitting).toBe(true);
    vi.runAllTimers();
    await waitFor(() => {
      expect(hook.result.current.submitting).toBe(false);
    });
  });

  it('allows to set submitting state manually', () => {
    const hook = renderHook(() => useForm({ mode, initialValues: { a: 1, b: 2 } }));
    expect(hook.result.current.submitting).toBe(false);

    act(() => {
      hook.result.current.setSubmitting(true);
    });

    expect(hook.result.current.submitting).toBe(true);

    act(() => {
      hook.result.current.setSubmitting(false);
    });

    expect(hook.result.current.submitting).toBe(false);
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
