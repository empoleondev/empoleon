import { __InputStylesNames } from '@empoleon/core';
import { inputDefaultProps, inputStylesApiSelectors, render, tests } from '@empoleon-tests/core';
import { datesTests, expectValue } from '@empoleon-tests/dates';
import { YearPickerInput, YearPickerInputProps } from './YearPickerInput';

const defaultProps = {
  popoverProps: { withinPortal: false, transitionProps: { duration: 0 } },
  modalProps: { withinPortal: false, transitionProps: { duration: 0 } },
};

const defaultPropsWithInputProps = {
  ...defaultProps,
  ...(inputDefaultProps as any),
};

describe('@empoleon/dates/YearPickerInput', () => {
  beforeEach(() => {
    window.scrollTo = vi.fn();
  });

  tests.axe([
    () => <YearPickerInput aria-label="test-label" />,
    () => <YearPickerInput aria-label="test-label" error />,
    () => <YearPickerInput aria-label="test-label" error="test-error" id="test" />,
    () => <YearPickerInput aria-label="test-label" description="test-description" />,
  ]);

  tests.itSupportsSystemProps<YearPickerInputProps, __InputStylesNames>({
    component: YearPickerInput,
    props: defaultPropsWithInputProps,
    styleProps: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLButtonElement,
    displayName: '@empoleon/dates/YearPickerInput',
    stylesApiSelectors: [...inputStylesApiSelectors],
  });

  tests.itSupportsInputProps<YearPickerInputProps>({
    component: YearPickerInput,
    props: defaultPropsWithInputProps,
    selector: 'button',
  });

  datesTests.itSupportsDateInputProps({ component: YearPickerInput, props: defaultProps });
  datesTests.itSupportsClearableProps({
    component: YearPickerInput,
    props: { ...defaultProps, defaultValue: '2022-04-11' },
  });
  datesTests.itSupportsYearsListProps({
    component: YearPickerInput,
    props: {
      ...defaultProps,
      defaultValue: '2022-04-11',
      popoverProps: { opened: true, withinPortal: false, transitionProps: { duration: 0 } },
    },
  });

  it('supports valueFormat prop', () => {
    const { container, rerender } = render(() => (
      <YearPickerInput {...defaultProps} valueFormat="YY" value="2022-04-11" />
    ));
    expectValue(container, '22');

    rerender(() => (
      <YearPickerInput
        {...defaultProps}
        type="multiple"
        valueFormat="YY"
        value={['2022-04-11', '2024-04-11']}
      />
    ));
    expectValue(container, '22, 24');

    rerender(() => (
      <YearPickerInput
        {...defaultProps}
        type="range"
        valueFormat="YY"
        value={['2022-04-11', '2024-04-11']}
      />
    ));
    expectValue(container, '22 – 24');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(() => (
      <YearPickerInput
        {...defaultProps}
        popoverProps={{ opened: true, withinPortal: false, transitionProps: { duration: 0 } }}
      />
    ));
    expect(container.querySelector('[data-dates-input]')).toHaveClass(
      'empoleon-YearPickerInput-input'
    );

    expect(container.querySelector('table button')).toHaveClass(
      'empoleon-YearPickerInput-yearsListControl'
    );
  });
});
