import { render, screen, tests } from '@empoleon-tests/core';
import { Indicator, IndicatorProps, IndicatorStylesNames } from './Indicator';

const defaultProps: IndicatorProps = {};

describe('@empoleon/core/Indicator', () => {
  tests.itSupportsSystemProps<IndicatorProps, IndicatorStylesNames>({
    component: Indicator,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/Indicator',
    stylesApiSelectors: ['root', 'indicator'],
  });

  it('renders given label', () => {
    render(() => <Indicator {...defaultProps} label="test-label" />);
    expect(screen.getByText('test-label')).toBeInTheDocument();
  });

  it('does not render indicator if component is disabled', () => {
    render(() => <Indicator {...defaultProps} label="test-label" disabled />);
    expect(screen.queryAllByText('test-label')).toHaveLength(0);
  });
});
