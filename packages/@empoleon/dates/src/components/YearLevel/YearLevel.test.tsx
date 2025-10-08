import dayjs from 'dayjs';
import { render, screen, tests } from '@empoleon-tests/core';
import { datesTests } from '@empoleon-tests/dates';
import { YearLevel, YearLevelProps, YearLevelStylesNames } from './YearLevel';

const defaultProps: YearLevelProps = {
  year: '2022-04-11',
  levelControlAriaLabel: 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@empoleon/dates/YearLevel', () => {
  tests.itSupportsSystemProps<YearLevelProps, YearLevelStylesNames>({
    component: YearLevel,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/dates/YearLevel',
    stylesApiSelectors: [
      'calendarHeader',
      'calendarHeaderControl',
      'calendarHeaderControlIcon',
      'calendarHeaderLevel',
      'calendarHeaderLevel',
      'monthsList',
      'monthsListCell',
      'monthsListControl',
      'monthsListRow',
    ],
    compound: true,
    providerStylesApi: false,
  });

  datesTests.itSupportsGetControlRef({
    component: YearLevel,
    props: defaultProps,
    numberOfControls: 12,
  });
  datesTests.itSupportsHeaderProps({ component: YearLevel, props: defaultProps });
  datesTests.itSupportsWithNextPrevious({ component: YearLevel, props: defaultProps });
  datesTests.itSupportsMonthsListProps({ component: YearLevel, props: defaultProps });
  datesTests.itSupportsOnControlKeydown({ component: YearLevel, props: defaultProps });
  datesTests.itSupportsOnControlClick({ component: YearLevel, props: defaultProps });
  datesTests.itSupportsOnControlMouseEnter({ component: YearLevel, props: defaultProps });

  it('renders correct CalendarHeader label', () => {
    render(() => <YearLevel {...defaultProps} />);
    const button = screen.getByRole('button', { name: /level-control/i });
    expect(button.textContent).toBe('2022');
  });

  it('supports changing year label format', () => {
    render(() => <YearLevel {...defaultProps} yearLabelFormat="MM/YY" />);
    const button = screen.getByRole('button', { name: /level-control/i });
    expect(button.textContent).toBe('04/22');
  });

  it('supports changing year label with callback', () => {
    render(() => (
      <YearLevel {...defaultProps} yearLabelFormat={(date) => `${dayjs(date).format('MM/YYYY')}`} />
    ));

    const button = screen.getByRole('button', { name: /level-control/i });
    expect(button.textContent).toBe('04/2022');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(() => <YearLevel {...defaultProps} />);
    expect(container.querySelector('table td button')).toHaveClass(
      'empoleon-YearLevel-monthsListControl'
    );
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'empoleon-YearLevel-calendarHeaderLevel'
    );
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(() => <YearLevel {...defaultProps} __staticSelector="Calendar" />);
    expect(container.querySelector('table td button')).toHaveClass(
      'empoleon-Calendar-monthsListControl'
    );
    expect(screen.getByLabelText('level-control')).toHaveClass(
      'empoleon-Calendar-calendarHeaderLevel'
    );
  });

  it('disables next control if maxDate is before end of month', () => {
    render(() => <YearLevel {...defaultProps} maxDate="2022-04-11" />);
    expect(screen.getByLabelText('next')).toBeDisabled();
  });

  it('disables previous control if minDate is after start of month', () => {
    render(() => <YearLevel {...defaultProps} minDate="2022-04-11" />);
    expect(screen.getByLabelText('prev')).toBeDisabled();
  });
});
