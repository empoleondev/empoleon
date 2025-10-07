import dayjs from 'dayjs';
import { renderHook } from '@solidjs/testing-library';
import { useUncontrolledDates } from './use-uncontrolled-dates';

type HookConfig = Parameters<typeof useUncontrolledDates>[0];

const hookDefaults: Omit<HookConfig, 'type'> = {
  defaultValue: undefined!,
  value: undefined!,
  onChange: () => {},
};

const defaultTypeValue = dayjs(new Date()).format('YYYY-MM-DD');

const rangeTypeValue = [
  dayjs(new Date()).format('YYYY-MM-DD'),
  dayjs(new Date(Date.now() + 86400000)).format('YYYY-MM-DD'),
];

const multipleTypeValue = [
  dayjs(new Date(Date.now() - 86400000)).format('YYYY-MM-DD'),
  dayjs(new Date()).format('YYYY-MM-DD'),
  dayjs(new Date(Date.now() + 86400000)).format('YYYY-MM-DD'),
];

const setupHook = (config: Pick<HookConfig, 'type'> & Partial<HookConfig>) =>
  renderHook((innerConfig: HookConfig) => useUncontrolledDates(innerConfig), {
    initialProps: [
      {
        ...hookDefaults,
        ...config,
      },
    ],
  });

describe('use-uncontrolled-dates', () => {
  it('returns correct value for type `default` and uncontrolled use in case no defaultValue has been specified', () => {
    const { result } = setupHook({
      type: 'default',
    });
    expect(result[0]()).toBe(null);
  });

  it('returns correct value for type `multiple` and uncontrolled use in case no defaultValue has been specified', () => {
    const { result } = setupHook({
      type: 'multiple',
    });
    expect(result[0]()).toStrictEqual([]);
  });

  it('returns correct value for type `range` and uncontrolled use in case no defaultValue has been specified', () => {
    const { result } = setupHook({
      type: 'range',
    });
    expect(result[0]()).toStrictEqual([null, null]);
  });

  it('returns defaultValue for type `default` and uncontrolled use', () => {
    const { result } = setupHook({
      type: 'default',
      defaultValue: defaultTypeValue,
    });
    expect(result[0]()).toBe(defaultTypeValue);
  });

  it('returns defaultValue for type `multiple` and uncontrolled use', () => {
    const { result } = setupHook({
      type: 'multiple',
      defaultValue: multipleTypeValue,
    });
    expect(result[0]()).toStrictEqual(multipleTypeValue);
  });

  it('returns defaultValue for type `range` and uncontrolled use', () => {
    const { result } = setupHook({
      type: 'range',
      defaultValue: rangeTypeValue,
    });
    expect(result[0]()).toStrictEqual(rangeTypeValue);
  });

  it('returns value for type `default` and controlled use', () => {
    const { result } = setupHook({
      type: 'default',
      value: defaultTypeValue,
    });
    expect(result[0]()).toBe(defaultTypeValue);
  });

  it('returns value for type `multiple` and controlled use', () => {
    const { result } = setupHook({
      type: 'multiple',
      value: multipleTypeValue,
    });
    expect(result[0]()).toStrictEqual(multipleTypeValue);
  });

  it('returns value for type `range` and controlled use', () => {
    const { result } = setupHook({
      type: 'range',
      value: rangeTypeValue,
    });
    expect(result[0]()).toStrictEqual(rangeTypeValue);
  });

  it('allows changing the type in controlled use', () => {
    let hook = setupHook({
      type: 'default',
      value: defaultTypeValue,
    });

    expect(hook.result[0]()).toBe(defaultTypeValue);

    hook = setupHook({
      type: 'multiple',
      value: multipleTypeValue,
    });
    expect(hook.result[0]()).toStrictEqual(multipleTypeValue);
  });

  it('resets the value when changing the type in uncontrolled use', () => {
    let hook = setupHook({
      type: 'default',
      defaultValue: defaultTypeValue,
    });

    expect(hook.result[0]()).toBe(defaultTypeValue);

    hook = setupHook({
      type: 'multiple',
      defaultValue: multipleTypeValue,
    });

    expect(hook.result[0]()).toStrictEqual(multipleTypeValue);

    hook = setupHook({
      type: 'default',
    });
    expect(hook.result[0]()).toStrictEqual(null);

    hook = setupHook({
      type: 'range',
      defaultValue: rangeTypeValue,
    });
    expect(hook.result[0]()).toStrictEqual(rangeTypeValue);

    hook = setupHook({
      type: 'default',
    });
    expect(hook.result[0]()).toStrictEqual(null);
  });
});
