import { render, screen, tests } from '@empoleon-tests/core';
import {
  ActionIconGroup,
  ActionIconGroupProps,
  ActionIconGroupStylesNames,
} from './ActionIconGroup';

const defaultProps: ActionIconGroupProps = {};

describe('@empoleon/core/ActionIconGroup', () => {
  tests.itSupportsSystemProps<ActionIconGroupProps, ActionIconGroupStylesNames>({
    component: ActionIconGroup,
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
    displayName: '@empoleon/core/ActionIconGroup',
    stylesApiSelectors: ['group'],
  });

  it('adds data-orientation attribute to root element based on orientation prop', () => {
    render(() => <ActionIconGroup orientation="vertical" />);
    expect(screen.getByRole('group')).toHaveAttribute('data-orientation', 'vertical');
  });
});
