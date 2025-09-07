import { render, screen, tests } from '@empoleon-tests/core';
import { ButtonGroup, ButtonGroupProps, ButtonGroupStylesNames } from './ButtonGroup';

const defaultProps: ButtonGroupProps = {};

describe('@empoleon/core/ButtonGroup', () => {
  tests.itSupportsSystemProps<ButtonGroupProps, ButtonGroupStylesNames>({
    component: ButtonGroup,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/ButtonGroup',
    stylesApiSelectors: ['group'],
  });

  it('adds data-orientation attribute to root element based on orientation prop', () => {
    render(() => <ButtonGroup orientation="vertical" />);
    expect(screen.getByRole('group')).toHaveAttribute('data-orientation', 'vertical');
  });
});
