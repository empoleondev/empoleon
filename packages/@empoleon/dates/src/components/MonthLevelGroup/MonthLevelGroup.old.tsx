import { render, screen, tests } from '@empoleon-tests/core';
import { datesTests } from '@empoleon-tests/dates';
import {
  MonthLevelGroup,
  MonthLevelGroupProps,
  MonthLevelGroupStylesNames,
} from './MonthLevelGroup';

const defaultProps: MonthLevelGroupProps = {
  month: '2022-04-11',
  levelControlAriaLabel: () => 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@empoleon/dates/MonthLevelGroup', () => {
  tests.itSupportsSystemProps<MonthLevelGroupProps, MonthLevelGroupStylesNames>({
    component: MonthLevelGroup,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/dates/MonthLevelGroup',
    stylesApiSelectors: [
      'calendarHeader',
      'calendarHeaderControl',
      'calendarHeaderControlIcon',
      'calendarHeaderLevel',
      'day',
      'levelsGroup',
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

  datesTests.itSupportsMonthProps({ component: MonthLevelGroup, props: defaultProps });
  datesTests.itSupportsHeaderProps({ component: MonthLevelGroup, props: defaultProps });
  datesTests.itSupportsOnDayClick({ component: MonthLevelGroup, props: defaultProps });
  datesTests.itHandlesMonthKeyboardEvents({
    component: MonthLevelGroup,
    props: defaultProps,
    name: 'MonthLevelGroup',
  });

  it('renders correct number of months based on numberOfColumns prop', () => {
    const { rerender } = render(<MonthLevelGroup {...defaultProps} numberOfColumns={1} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(1);

    rerender(<MonthLevelGroup {...defaultProps} numberOfColumns={2} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(2);

    rerender(<MonthLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(3);
  });

  it('renders correct months group based on month prop', () => {
    render(<MonthLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control').map((node) => node.textContent)).toStrictEqual(
      ['April 2022', 'May 2022', 'June 2022']
    );
  });

  it('supports levelControlAriaLabel as string', () => {
    render(<MonthLevelGroup {...defaultProps} levelControlAriaLabel="test-label" />);
    expect(screen.getByText('April 2022')).toHaveAttribute('aria-label', 'test-label');
  });

  it('supports levelControlAriaLabel as function', () => {
    render(
      <MonthLevelGroup
        {...defaultProps}
        levelControlAriaLabel={(date) =>
          `${new Date(date).getMonth()}/${new Date(date).getFullYear()}`
        }
      />
    );
    expect(screen.getByText('April 2022')).toHaveAttribute('aria-label', '3/2022');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<MonthLevelGroup {...defaultProps} />);
    expect(container.querySelector('table button')).toHaveClass('empoleon-MonthLevelGroup-day');
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(<MonthLevelGroup {...defaultProps} __staticSelector="Calendar" />);
    expect(container.querySelector('table button')).toHaveClass('empoleon-Calendar-day');
  });
});
