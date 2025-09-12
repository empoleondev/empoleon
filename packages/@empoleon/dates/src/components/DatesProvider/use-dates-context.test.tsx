import { render, renderHook } from '@solidjs/testing-library';
import { DatesProvider } from './DatesProvider';
import { useDatesContext } from './use-dates-context';

describe('@empoleon/dates/use-dates-context', () => {
  it('returns default values from context if hook is called without DatesProvider', () => {
    const hook = renderHook(() => useDatesContext());
    expect(hook.result.locale).toBe('en');
    expect(hook.result.firstDayOfWeek).toBe(1);
    expect(hook.result.weekendDays).toStrictEqual([0, 6]);

    expect(hook.result.getLocale()).toBe('en');
    expect(hook.result.getLocale('ru')).toBe('ru');

    expect(hook.result.getFirstDayOfWeek()).toBe(1);
    expect(hook.result.getFirstDayOfWeek(0)).toBe(0);
    expect(hook.result.getFirstDayOfWeek(6)).toBe(6);

    expect(hook.result.getWeekendDays()).toStrictEqual([0, 6]);
    expect(hook.result.getWeekendDays([1, 5])).toStrictEqual([1, 5]);
  });

  it('returns correct values from DatesProvider context', () => {
    let hookResult: any;

    function TestComponent() {
      hookResult = useDatesContext();
      return <div>test</div>;
    }

    render(() => (
      <DatesProvider settings={{ locale: 'ru', firstDayOfWeek: 0, weekendDays: [1, 2] }}>
        <TestComponent />
      </DatesProvider>
    ));

    expect(hookResult.locale).toBe('ru');
    expect(hookResult.firstDayOfWeek).toBe(0);
    expect(hookResult.weekendDays).toStrictEqual([1, 2]);

    expect(hookResult.getLocale()).toBe('ru');
    expect(hookResult.getLocale('en')).toBe('en');

    expect(hookResult.getFirstDayOfWeek()).toBe(0);
    expect(hookResult.getFirstDayOfWeek(1)).toBe(1);

    expect(hookResult.getWeekendDays()).toStrictEqual([1, 2]);
    expect(hookResult.getWeekendDays([1, 5])).toStrictEqual([1, 5]);
  });
});
