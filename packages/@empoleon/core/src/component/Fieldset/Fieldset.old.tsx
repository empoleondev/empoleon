import { render, screen, tests } from '@empoleon-tests/core';
import { Fieldset, FieldsetProps, FieldsetStylesNames } from './Fieldset';

const defaultProps: FieldsetProps = {
  legend: 'test-legend',
};

describe('@empoleon/core/Fieldset', () => {
  tests.itSupportsSystemProps<FieldsetProps, FieldsetStylesNames>({
    component: Fieldset,
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
    refType: HTMLFieldSetElement,
    displayName: '@empoleon/core/Fieldset',
    stylesApiSelectors: ['root', 'legend'],
  });

  it('renders given label', () => {
    render(<Fieldset {...defaultProps} legend="test-legend" />);
    expect(screen.getByText('test-legend')).toBeInTheDocument();
  });
});
