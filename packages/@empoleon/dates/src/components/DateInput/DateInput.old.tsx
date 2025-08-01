import { __InputStylesNames } from '@empoleon/core';
import {
  inputDefaultProps,
  inputStylesApiSelectors,
  render,
  screen,
  tests,
  userEvent,
} from '@empoleon-tests/core';
import {
  clickControl,
  datesTests,
  expectNoPopover,
  expectOpenedPopover,
  expectValue,
} from '@empoleon-tests/dates';
import { DateInput, DateInputProps } from './DateInput';

const defaultProps: DateInputProps = {
  popoverProps: { transitionProps: { duration: 0 }, withinPortal: false },
  ariaLabels: {
    monthLevelControl: 'level-control',
    yearLevelControl: 'level-control',
    nextMonth: 'next',
    previousMonth: 'previous',
    nextYear: 'next',
    previousYear: 'previous',
    nextDecade: 'next',
    previousDecade: 'previous',
  },
};

const defaultPropsWithInputProps: DateInputProps = {
  ...defaultProps,
  ...(inputDefaultProps as any),
};

function getInput(container: HTMLElement | null) {
  return container!.querySelector('[data-dates-input]')!;
}

describe('@empoleon/dates/DateInput', () => {
  tests.axe([
    <DateInput aria-label="test-label" key="1" />,
    <DateInput label="test-label" key="2" />,
    <DateInput label="test-label" error key="3" />,
    <DateInput label="test-label" error="test-error" id="test" key="4" />,
    <DateInput label="test-label" description="test-description" key="5" />,
  ]);

  tests.itSupportsSystemProps<DateInputProps, __InputStylesNames>({
    component: DateInput,
    props: defaultPropsWithInputProps,
    styleProps: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLInputElement,
    displayName: '@empoleon/dates/DateInput',
    stylesApiSelectors: [...inputStylesApiSelectors],
  });

  tests.itSupportsInputProps<DateInputProps>({
    component: DateInput,
    props: defaultPropsWithInputProps,
    selector: 'input',
  });

  datesTests.itSupportsClearableProps({
    component: DateInput,
    props: { defaultValue: '2022-04-11' },
  });

  datesTests.itSupportsYearsListProps({
    component: DateInput,
    props: {
      ...defaultProps,
      defaultLevel: 'decade',
      defaultValue: '2022-04-11',
      popoverProps: { opened: true, withinPortal: false, transitionProps: { duration: 0 } },
    },
  });

  datesTests.itSupportsMonthsListProps({
    component: DateInput,
    props: {
      ...defaultProps,
      defaultLevel: 'year',
      defaultValue: '2022-04-11',
      popoverProps: { opened: true, withinPortal: false, transitionProps: { duration: 0 } },
    },
  });

  it('opens/closes dropdown when input is focused/blurred', async () => {
    const { container } = render(<DateInput {...defaultProps} />);
    expectNoPopover(container);

    await userEvent.tab();
    expect(getInput(container)).toHaveFocus();
    expectOpenedPopover(container);

    await userEvent.tab();
    expect(document.body).toHaveFocus();
    expectNoPopover(container);
  });

  it('does not open popover if readOnly prop is set', async () => {
    const { container } = render(<DateInput {...defaultProps} readOnly />);
    expectNoPopover(container);
    await userEvent.tab();
    expectNoPopover(container);
  });

  it('closes popover after date control was clicked', async () => {
    const { container } = render(<DateInput {...defaultProps} />);
    await userEvent.tab();
    await clickControl(container, 10);
    expectNoPopover(container);
  });

  it('opens popover when input is clicked', async () => {
    const { container } = render(<DateInput {...defaultProps} />);
    await userEvent.tab();
    await clickControl(container, 10);
    await userEvent.click(getInput(container));
    expectOpenedPopover(container);
  });

  it('allows changing levels in popover', async () => {
    const { container } = render(<DateInput {...defaultProps} />);
    await userEvent.tab();
    await userEvent.click(screen.getByLabelText('level-control'));
    await userEvent.click(screen.getByLabelText('level-control'));
    await userEvent.click(screen.getByLabelText('previous'));
    await userEvent.click(container.querySelector('table button')!);
    await userEvent.click(container.querySelector('table button')!);
    await userEvent.click(container.querySelectorAll('table button')[4]);
    expect(getInput(container)).toHaveFocus();
    expectValue(container, 'January 1, 2010');
  });

  it('supports uncontrolled state (dropdown click)', async () => {
    const { container } = render(<DateInput date="2022-04-11" {...defaultProps} />);
    await userEvent.tab();
    await clickControl(container, 4);
    expectValue(container, 'April 1, 2022');
  });

  it('supports controlled state (dropdown click)', async () => {
    const spy = vi.fn();
    const { container } = render(
      <DateInput {...defaultProps} date="2022-04-11" value="2022-04-11" onChange={spy} />
    );
    await userEvent.tab();
    await clickControl(container, 4);
    expectValue(container, 'April 11, 2022');
    expect(spy).toHaveBeenCalledWith('2022-04-01');
  });

  it('supports uncontrolled state (free input)', async () => {
    const { container } = render(<DateInput date="2022-04-11" {...defaultProps} />);
    await userEvent.tab();
    await userEvent.type(getInput(container), 'April 1, 2022');
    await userEvent.tab();
    expectValue(container, 'April 1, 2022');
  });

  it('supports controlled state (free input)', async () => {
    const spy = vi.fn();
    const { container } = render(<DateInput {...defaultProps} value="2022-04-11" onChange={spy} />);
    await userEvent.tab();
    await userEvent.clear(getInput(container));
    await userEvent.type(getInput(container), 'April 1, 2022');
    await userEvent.tab();
    expectValue(container, 'April 11, 2022');
    expect(spy).toHaveBeenLastCalledWith('2022-04-01');
  });

  it('clears input when clear button is clicked (uncontrolled)', async () => {
    const { container } = render(
      <DateInput
        {...defaultProps}
        clearable
        defaultValue="2022-04-11"
        clearButtonProps={{ 'aria-label': 'clear-button' }}
      />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.click(screen.getByLabelText('clear-button'));
    expectValue(container, '');
  });

  it('clears input when clear button is clicked (controlled)', async () => {
    const spy = vi.fn();
    const { container } = render(
      <DateInput
        {...defaultProps}
        clearable
        value="2022-04-11"
        onChange={spy}
        clearButtonProps={{ 'aria-label': 'clear-button' }}
      />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.click(screen.getByLabelText('clear-button'));
    expectValue(container, 'April 11, 2022');
    expect(spy).toHaveBeenLastCalledWith(null);
  });

  it('allows to clear input value when clearable is set (uncontrolled)', async () => {
    const { container } = render(
      <DateInput {...defaultProps} clearable defaultValue="2022-04-11" />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.clear(getInput(container));
    await userEvent.tab();
    expectValue(container, '');
  });

  it('allows to clear input value when clearable is set (controlled)', async () => {
    const spy = vi.fn();
    const { container } = render(
      <DateInput {...defaultProps} clearable value="2022-04-11" onChange={spy} />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.clear(getInput(container));
    await userEvent.tab();
    expectValue(container, 'April 11, 2022');
    expect(spy).toHaveBeenLastCalledWith(null);
  });

  it('does not allow to clear input value when clearable is not set (uncontrolled)', async () => {
    const { container } = render(
      <DateInput {...defaultProps} clearable={false} defaultValue="2022-04-11" />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.clear(getInput(container));
    await userEvent.tab();
    expectValue(container, 'April 11, 2022');
  });

  it('does not allow to clear input value when clearable is not set (controlled)', async () => {
    const spy = vi.fn();
    const { container } = render(
      <DateInput {...defaultProps} clearable={false} value="2022-04-11" onChange={spy} />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.clear(getInput(container));
    await userEvent.tab();
    expectValue(container, 'April 11, 2022');
    expect(spy).not.toHaveBeenCalled();
  });

  it('allows to clear input value by clicking the selected date when clearable and allowDeselect are set (uncontrolled)', async () => {
    const { container } = render(
      <DateInput {...defaultProps} clearable allowDeselect defaultValue="2022-04-01" />
    );

    expectValue(container, 'April 1, 2022');
    await userEvent.tab();
    await clickControl(container, 4);
    expectValue(container, '');
  });

  it('allows to clear input value by clicking the selected date when clearable and allowDeselect are set (controlled)', async () => {
    const spy = vi.fn();
    const { container } = render(
      <DateInput {...defaultProps} clearable allowDeselect value="2022-04-01" onChange={spy} />
    );

    expectValue(container, 'April 1, 2022');
    await userEvent.tab();
    await clickControl(container, 4);
    expectValue(container, 'April 1, 2022');
    expect(spy).toHaveBeenLastCalledWith(null);
  });

  it('does not allow to clear input value by clicking the selected date when allowDeselect is not set (uncontrolled)', async () => {
    const { container } = render(
      <DateInput {...defaultProps} clearable allowDeselect={false} defaultValue="2022-04-01" />
    );

    expectValue(container, 'April 1, 2022');
    await userEvent.tab();
    await clickControl(container, 4);
    expectValue(container, 'April 1, 2022');
  });

  it('does not allow to clear input value by clicking the selected date when allowDeselect is not set (controlled)', async () => {
    const spy = vi.fn();
    const { container } = render(
      <DateInput
        {...defaultProps}
        clearable
        allowDeselect={false}
        value="2022-04-01"
        onChange={spy}
      />
    );

    expectValue(container, 'April 1, 2022');
    await userEvent.tab();
    await clickControl(container, 4);
    expectValue(container, 'April 1, 2022');
    expect(spy).toHaveBeenLastCalledWith('2022-04-01');
  });

  it('calls onClick when input is clicked', async () => {
    const spy = vi.fn();
    const { container } = render(<DateInput {...defaultProps} onClick={spy} />);
    await userEvent.click(getInput(container));
    expect(spy).toHaveBeenCalled();
  });

  it('render hidden input with given value', () => {
    const { container } = render(
      <DateInput {...defaultProps} value="2022-04-11" name="hidden-name" form="hidden-form" />
    );
    const input = container.querySelector('input[type="hidden"]');
    expect(input).toHaveValue('2022-04-11');
    expect(input).toHaveAttribute('name', 'hidden-name');
    expect(input).toHaveAttribute('form', 'hidden-form');
  });

  it('supports custom value format', () => {
    const { container } = render(
      <DateInput {...defaultProps} defaultValue="2022-04-11" valueFormat="DD/MM/YYYY" />
    );
    expectValue(container, '11/04/2022');
  });

  it('does not update value on blur if fixOnBlur={false}', async () => {
    const { container } = render(
      <DateInput {...defaultProps} fixOnBlur={false} defaultValue="2022-04-11" />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.clear(getInput(container));
    await userEvent.type(getInput(container), 'invalid value');
    await userEvent.tab();
    expectValue(container, 'invalid value');
  });

  it('updates value on blur if fixOnBlur={true}', async () => {
    const { container } = render(
      <DateInput {...defaultProps} fixOnBlur defaultValue="2022-04-11" />
    );

    expectValue(container, 'April 11, 2022');
    await userEvent.clear(getInput(container));
    await userEvent.type(getInput(container), 'invalid value');
    await userEvent.tab();
    expectValue(container, 'April 11, 2022');
  });

  it('supports custom date parser', async () => {
    const { container } = render(
      <DateInput
        {...defaultProps}
        dateParser={(input) => (input === 'secret-date' ? '2022-04-11' : null)}
      />
    );

    await userEvent.type(getInput(container), 'secret-date');
    await userEvent.tab();
    expectValue(container, 'April 11, 2022');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(
      <DateInput
        {...defaultProps}
        popoverProps={{ opened: true, withinPortal: false, transitionProps: { duration: 0 } }}
      />
    );
    expect(container.querySelector('[data-dates-input]')).toHaveClass('empoleon-DateInput-input');

    expect(container.querySelector('table button')!).toHaveClass('empoleon-DateInput-day');
  });
});
