import { __InputStylesNames } from '@empoleon/core';
import { inputDefaultProps, inputStylesApiSelectors, render, tests } from '@empoleon-tests/core';
import { clickControl, clickInput, datesTests, expectValue } from '@empoleon-tests/dates';
import { DatePickerInput, DatePickerInputProps } from './DatePickerInput';

const defaultProps = {
  popoverProps: { withinPortal: false, transitionProps: { duration: 0 } },
  modalProps: { withinPortal: false, transitionProps: { duration: 0 } },
};

const defaultPropsWithInputProps = {
  ...defaultProps,
  ...(inputDefaultProps as any),
};

describe('@empoleon/dates/DatePickerInput', () => {
  tests.axe([
    <DatePickerInput aria-label="test-label" key="1" />,
    <DatePickerInput aria-label="test-label" error key="2" />,
    <DatePickerInput aria-label="test-label" error="test-error" id="test" key="3" />,
    <DatePickerInput aria-label="test-label" description="test-description" key="4" />,
  ]);

  tests.itSupportsSystemProps<DatePickerInputProps, __InputStylesNames>({
    component: DatePickerInput,
    props: defaultPropsWithInputProps,
    styleProps: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLButtonElement,
    displayName: '@empoleon/dates/DatePickerInput',
    stylesApiSelectors: [...inputStylesApiSelectors],
  });

  tests.itSupportsInputProps<DatePickerInputProps>({
    component: DatePickerInput,
    props: defaultPropsWithInputProps,
    selector: 'button',
  });

  datesTests.itSupportsDateInputProps({ component: DatePickerInput, props: defaultProps });
  datesTests.itSupportsClearableProps({
    component: DatePickerInput,
    props: { ...defaultProps, defaultValue: '2022-04-11' },
  });
  datesTests.itSupportsYearsListProps({
    component: DatePickerInput,
    props: {
      ...defaultProps,
      defaultLevel: 'decade',
      defaultValue: '2022-04-11',
      popoverProps: { opened: true, withinPortal: false, transitionProps: { duration: 0 } },
    },
  });

  datesTests.itSupportsMonthsListProps({
    component: DatePickerInput,
    props: {
      ...defaultProps,
      defaultLevel: 'year',
      defaultValue: '2022-04-11',
      popoverProps: { opened: true, withinPortal: false, transitionProps: { duration: 0 } },
    },
  });

  it('supports valueFormat prop', () => {
    const { container, rerender } = render(
      <DatePickerInput {...defaultProps} valueFormat="MMMM" value="2022-04-11" />
    );
    expectValue(container, 'April');

    rerender(
      <DatePickerInput
        {...defaultProps}
        type="multiple"
        valueFormat="MMMM"
        value={['2022-04-11', '2022-05-11']}
      />
    );
    expectValue(container, 'April, May');

    rerender(
      <DatePickerInput
        {...defaultProps}
        type="range"
        valueFormat="MMMM"
        value={['2022-04-11', '2022-05-11']}
      />
    );
    expectValue(container, 'April – May');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(
      <DatePickerInput
        {...defaultProps}
        popoverProps={{ opened: true, withinPortal: false, transitionProps: { duration: 0 } }}
      />
    );
    expect(container.querySelector('[data-dates-input]')).toHaveClass(
      'empoleon-DatePickerInput-input'
    );

    expect(container.querySelector('table button')).toHaveClass('empoleon-DatePickerInput-day');
  });

  it('supports controlled state (dropdown click)', async () => {
    const spy = vi.fn();
    const { container } = render(
      <DatePickerInput {...defaultProps} value="2022-04-11" onChange={spy} />
    );
    await clickInput(container);
    await clickControl(container, 4);
    expectValue(container, 'April 11, 2022');
    expect(spy).toHaveBeenCalledWith('2022-04-01');
  });
});
