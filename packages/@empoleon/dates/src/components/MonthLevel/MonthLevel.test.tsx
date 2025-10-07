import { render, screen, tests } from '@empoleon-tests/core';
import { datesTests } from '@empoleon-tests/dates';
import { MonthLevel, MonthLevelProps, MonthLevelStylesNames } from './MonthLevel';

const defaultProps: MonthLevelProps = {
  month: '2022-04-11',
  levelControlAriaLabel: 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

function expectLabel(label: string) {
  expect(screen.getByLabelText('level-control')).toHaveTextContent(label);
}

describe('@empoleon/dates/MonthLevel', () => {
  tests.itSupportsSystemProps<MonthLevelProps, MonthLevelStylesNames>({
    component: MonthLevel,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/dates/MonthLevel',
    stylesApiSelectors: [
      'calendarHeader',
      'calendarHeaderControl',
      'calendarHeaderControlIcon',
      'calendarHeaderLevel',
      'day',
      'month',
      'monthCell',
      'monthRow',
      'monthTbody',
      'monthThead',
      'weekday',
      'weekdaysRow',
    ],

    compound: true,
    providerStylesApi: false,
  });

  datesTests.itSupportsHeaderProps({ component: MonthLevel, props: defaultProps });
  datesTests.itSupportsMonthProps({ component: MonthLevel, props: defaultProps });
  datesTests.itSupportsGetDayRef({ component: MonthLevel, props: defaultProps });
  datesTests.itSupportsWithNextPrevious({ component: MonthLevel, props: defaultProps });
  datesTests.itSupportsOnDayKeydown({ component: MonthLevel, props: defaultProps });
  datesTests.itSupportsOnDayClick({ component: MonthLevel, props: defaultProps });

  it('renders correct CalendarHeader label', () => {
    render(() => <MonthLevel {...defaultProps} />);
    const button = screen.getByRole('button', { name: /level-control/i });
    expect(button.textContent).toBe('April 2022');
  });

  it('supports changing month label format', () => {
    render(() => <MonthLevel {...defaultProps} monthLabelFormat="MM/YY" />);
    const button = screen.getByRole('button', { name: /level-control/i });
    expect(button.textContent).toBe('04/22');
  });

  it('supports changing month label with callback', () => {
    render(() => (
      <MonthLevel
        {...defaultProps}
        monthLabelFormat={(date) => `${new Date(date).getMonth()}/${new Date(date).getFullYear()}`}
      />
    ));

    const button = screen.getByRole('button', { name: /level-control/i });
    expect(button.textContent).toBe('3/2022');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(() => <MonthLevel {...defaultProps} />);
    expect(container.querySelector('table td button')).toHaveClass('empoleon-MonthLevel-day');
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'empoleon-MonthLevel-calendarHeaderLevel'
    );
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(() => (
      <MonthLevel {...defaultProps} __staticSelector="Calendar" />
    ));
    expect(container.querySelector('table td button')).toHaveClass('empoleon-Calendar-day');
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'empoleon-Calendar-calendarHeaderLevel'
    );
  });

  it('disables next control if maxDate is before end of month', () => {
    render(() => <MonthLevel {...defaultProps} maxDate="2022-04-11" />);
    expect(screen.getByLabelText('next')).toBeDisabled();
  });

  it('disables previous control if minDate is after start of month', () => {
    render(() => <MonthLevel {...defaultProps} minDate="2022-04-11" />);
    expect(screen.getByLabelText('prev')).toBeDisabled();
  });
});
