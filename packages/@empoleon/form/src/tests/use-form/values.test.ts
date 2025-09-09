import { renderHook } from '@solidjs/testing-library';
import { useForm } from '../../use-form';

describe('@empoleon/form/values', () => {
  it('sets given initial values', () => {
    const hook = renderHook(() => useForm({ initialValues: { a: 1, b: 2 } }));
    expect(hook.result.values).toStrictEqual({ a: 1, b: 2 });
  });

  it('allows to initialize form without initial values', () => {
    const hook = renderHook(() => useForm<{ a: 1; b: 2 }>());
    expect(hook.result.values).toStrictEqual({});
  });

  it('sets values with setValues handler after initialization with initialValues', () => {
    const hook = renderHook(() => useForm({ initialValues: { a: 1, b: 2 } }));
    hook.result.setValues({ a: 3, b: 4 });
    expect(hook.result.values).toStrictEqual({ a: 3, b: 4 });
  });

  it('sets values with setValues handler after initialization without initialValues', () => {
    const hook = renderHook(() => useForm<{ a: number; b: number }>());
    hook.result.setValues({ a: 3, b: 4 });
    expect(hook.result.values).toStrictEqual({ a: 3, b: 4 });
  });

  it('calls onValuesChange when setValues is called', () => {
    const spy = vi.fn();
    const hook = renderHook(() => useForm({ initialValues: { a: 1, b: 2 }, onValuesChange: spy }));
    hook.result.setValues({ a: 3, b: 4 });
    expect(spy).toHaveBeenCalledWith({ a: 3, b: 4 }, { a: 1, b: 2 });
  });

  it('calls onValuesChange when setValues is called with function', () => {
    const spy = vi.fn();
    const hook = renderHook(() => useForm({ initialValues: { a: 1, b: 2 }, onValuesChange: spy }));
    hook.result.setValues((current) => ({ ...current, a: 3 }));
    expect(spy).toHaveBeenCalledWith({ a: 3, b: 2 }, { a: 1, b: 2 });
  });

  it('calls onValuesChange when setValues is called with values partial', () => {
    const spy = vi.fn();
    const hook = renderHook(() => useForm({ initialValues: { a: 1, b: 2 }, onValuesChange: spy }));
    hook.result.setValues({ a: 3 });
    expect(spy).toHaveBeenCalledWith({ a: 3, b: 2 }, { a: 1, b: 2 });
  });

  it('calls onValuesChange when setFieldValue is called', () => {
    const spy = vi.fn();
    const hook = renderHook(() => useForm({ initialValues: { a: 1, b: 2 }, onValuesChange: spy }));
    hook.result.setFieldValue('a', 3);
    expect(spy).toHaveBeenCalledWith({ a: 3, b: 2 }, { a: 1, b: 2 });
  });
});

describe('@empoleon/form/values-uncontrolled', () => {
  it('sets given initial values', () => {
    const hook = renderHook(() => useForm({ mode: 'uncontrolled', initialValues: { a: 1, b: 2 } }));
    expect(hook.result.getValues()).toStrictEqual({ a: 1, b: 2 });
  });

  it('allows to initialize form without initial values', () => {
    const hook = renderHook(() => useForm<{ a: 1; b: 2 }>({ mode: 'uncontrolled' }));
    expect(hook.result.getValues()).toStrictEqual({});
  });

  it('sets values with setValues handler after initialization with initialValues', () => {
    const hook = renderHook(() => useForm({ mode: 'uncontrolled', initialValues: { a: 1, b: 2 } }));
    hook.result.setValues({ a: 3, b: 4 });
    expect(hook.result.getValues()).toStrictEqual({ a: 3, b: 4 });
  });

  it('sets values with setValues handler after initialization without initialValues', () => {
    const hook = renderHook(() => useForm<{ a: number; b: number }>({ mode: 'uncontrolled' }));
    hook.result.setValues({ a: 3, b: 4 });
    expect(hook.result.getValues()).toStrictEqual({ a: 3, b: 4 });
  });

  it('calls onValuesChange when setValues is called', () => {
    const spy = vi.fn();
    const hook = renderHook(() =>
      useForm({ mode: 'uncontrolled', initialValues: { a: 1, b: 2 }, onValuesChange: spy })
    );
    hook.result.setValues({ a: 3, b: 4 });
    expect(spy).toHaveBeenCalledWith({ a: 3, b: 4 }, { a: 1, b: 2 });
  });

  it('calls onValuesChange when setValues is called with function', () => {
    const spy = vi.fn();
    const hook = renderHook(() =>
      useForm({ mode: 'uncontrolled', initialValues: { a: 1, b: 2 }, onValuesChange: spy })
    );
    hook.result.setValues((current) => ({ ...current, a: 3 }));
    expect(spy).toHaveBeenCalledWith({ a: 3, b: 2 }, { a: 1, b: 2 });
  });

  it('calls onValuesChange when setValues is called with values partial', () => {
    const spy = vi.fn();
    const hook = renderHook(() =>
      useForm({ mode: 'uncontrolled', initialValues: { a: 1, b: 2 }, onValuesChange: spy })
    );
    hook.result.setValues({ a: 3 });
    expect(spy).toHaveBeenCalledWith({ a: 3, b: 2 }, { a: 1, b: 2 });
  });

  it('calls onValuesChange when setFieldValue is called', () => {
    const spy = vi.fn();
    const hook = renderHook(() =>
      useForm({ mode: 'uncontrolled', initialValues: { a: 1, b: 2 }, onValuesChange: spy })
    );
    hook.result.setFieldValue('a', 3);
    expect(spy).toHaveBeenCalledWith({ a: 3, b: 2 }, { a: 1, b: 2 });
  });
});
