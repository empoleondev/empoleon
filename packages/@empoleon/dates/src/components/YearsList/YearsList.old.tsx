import { render, screen, tests } from '@empoleon-tests/core';
import { datesTests } from '@empoleon-tests/dates';
import { YearsList, YearsListProps, YearsListStylesNames } from './YearsList';

const defaultProps: YearsListProps = {
  decade: '2022-04-11',
};

describe('@empoleon/dates/YearsList', () => {
  tests.itSupportsSystemProps<YearsListProps, YearsListStylesNames>({
    component: YearsList,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLTableElement,
    displayName: '@empoleon/dates/YearsList',
    stylesApiSelectors: ['yearsList', 'yearsListCell', 'yearsListControl', 'yearsListRow'],
  });

  datesTests.itSupportsGetControlRef({
    component: YearsList,
    props: defaultProps,
    numberOfControls: 10,
  });
  datesTests.itSupportsYearsListProps({ component: YearsList, props: defaultProps });
  datesTests.itSupportsOnControlKeydown({ component: YearsList, props: defaultProps });
  datesTests.itSupportsOnControlClick({ component: YearsList, props: defaultProps });
  datesTests.itSupportsOnControlMouseEnter({ component: YearsList, props: defaultProps });

  it('has correct default __staticSelector', () => {
    render(<YearsList {...defaultProps} />);
    expect(screen.getByRole('table')).toHaveClass('empoleon-YearsList-yearsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('empoleon-YearsList-yearsListControl');
  });

  it('supports custom __staticSelector', () => {
    render(<YearsList {...defaultProps} __staticSelector="Calendar" />);
    expect(screen.getByRole('table')).toHaveClass('empoleon-Calendar-yearsList');
    expect(screen.getAllByRole('button')[0]).toHaveClass('empoleon-Calendar-yearsListControl');
  });
});
