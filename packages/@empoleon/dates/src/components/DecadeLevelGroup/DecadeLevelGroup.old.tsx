import { render, screen, tests } from '@empoleon-tests/core';
import { datesTests } from '@empoleon-tests/dates';
import {
  DecadeLevelGroup,
  DecadeLevelGroupProps,
  DecadeLevelGroupStylesNames,
} from './DecadeLevelGroup';

const defaultProps: DecadeLevelGroupProps = {
  decade: '2022-04-11',
  levelControlAriaLabel: () => 'level-control',
  nextLabel: 'next',
  previousLabel: 'prev',
};

describe('@empoleon/dates/DecadeLevelGroup', () => {
  tests.itSupportsSystemProps<DecadeLevelGroupProps, DecadeLevelGroupStylesNames>({
    component: DecadeLevelGroup,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/dates/DecadeLevelGroup',
    stylesApiSelectors: [
      'levelsGroup',
      'calendarHeader',
      'calendarHeaderControl',
      'calendarHeaderControlIcon',
      'calendarHeaderLevel',
      'yearsList',
      'yearsListCell',
      'yearsListControl',
      'yearsListRow',
    ],
    compound: true,
    providerStylesApi: false,
  });

  datesTests.itSupportsYearsListProps({ component: DecadeLevelGroup, props: defaultProps });
  datesTests.itSupportsOnControlClick({ component: DecadeLevelGroup, props: defaultProps });
  datesTests.itSupportsOnControlMouseEnter({ component: DecadeLevelGroup, props: defaultProps });
  datesTests.itHandlesControlsKeyboardEvents({
    component: DecadeLevelGroup,
    props: defaultProps,
    listSelector: '.empoleon-DecadeLevelGroup-yearsList',
  });

  it('renders correct number of columns based on numberOfColumns prop', () => {
    const { rerender } = render(<DecadeLevelGroup {...defaultProps} numberOfColumns={1} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(1);

    rerender(<DecadeLevelGroup {...defaultProps} numberOfColumns={2} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(2);

    rerender(<DecadeLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control')).toHaveLength(3);
  });

  it('renders correct years group based on year prop', () => {
    render(<DecadeLevelGroup {...defaultProps} numberOfColumns={3} />);
    expect(screen.getAllByLabelText('level-control').map((node) => node.textContent)).toStrictEqual(
      ['2020 – 2029', '2030 – 2039', '2040 – 2049']
    );
  });

  it('supports levelControlAriaLabel as string', () => {
    render(<DecadeLevelGroup {...defaultProps} levelControlAriaLabel="test-label" />);
    expect(screen.getByText('2020 – 2029')).toHaveAttribute('aria-label', 'test-label');
  });

  it('supports levelControlAriaLabel as function', () => {
    render(
      <DecadeLevelGroup
        {...defaultProps}
        levelControlAriaLabel={(date) =>
          `${new Date(date).getMonth()}/${new Date(date).getFullYear()}`
        }
      />
    );
    expect(screen.getByText('2020 – 2029')).toHaveAttribute('aria-label', '3/2022');
  });

  it('has correct default __staticSelector', () => {
    const { container } = render(<DecadeLevelGroup {...defaultProps} />);
    expect(container.querySelector('table button')).toHaveClass(
      'empoleon-DecadeLevelGroup-yearsListControl'
    );
  });

  it('supports custom __staticSelector', () => {
    const { container } = render(
      <DecadeLevelGroup {...defaultProps} __staticSelector="Calendar" />
    );
    expect(container.querySelector('table button')).toHaveClass(
      'empoleon-Calendar-yearsListControl'
    );
  });
});
