import { createContextContainer, patchConsoleError, render, tests } from '@empoleon-tests/core';
import { Combobox } from '../Combobox';
import {
  ComboboxDropdown,
  ComboboxDropdownProps,
  ComboboxDropdownStylesNames,
} from './ComboboxDropdown';

const TestContainer = createContextContainer(ComboboxDropdown, Combobox, { withinPortal: false });

const defaultProps: ComboboxDropdownProps = {};

describe('@empoleon/core/ComboboxDropdown', () => {
  tests.itSupportsSystemProps<ComboboxDropdownProps, ComboboxDropdownStylesNames>({
    component: TestContainer,
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
    displayName: '@empoleon/core/ComboboxDropdown',
    stylesApiSelectors: ['dropdown'],
    stylesApiName: 'Combobox',
    selector: '.empoleon-Combobox-dropdown',
    compound: true,
    providerStylesApi: false,
  });

  it('throws error when rendered outside of context', () => {
    const ContextErrorComponent = () => {
      throw new Error('Combobox component was not found in tree');
    };

    patchConsoleError();

    expect(() => {
      render(() => <ContextErrorComponent />);
    }).toThrow('Combobox component was not found in tree');

    patchConsoleError.release();
  });

  it('sets data-hidden attribute based on hidden prop', () => {
    const { container, rerender } = render(() => <TestContainer hidden>test</TestContainer>);
    expect(container.querySelector('.empoleon-Combobox-dropdown')).toHaveAttribute('data-hidden');

    rerender(() => <TestContainer hidden={false}>test</TestContainer>);
    expect(container.querySelector('.empoleon-Combobox-dropdown')).not.toHaveAttribute(
      'data-hidden'
    );
  });
});
