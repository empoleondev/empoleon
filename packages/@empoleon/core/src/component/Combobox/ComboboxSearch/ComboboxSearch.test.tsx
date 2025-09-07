import { createContextContainer, patchConsoleError, render, tests } from '@empoleon-tests/core';
import { Combobox } from '../Combobox';
import { ComboboxSearch, ComboboxSearchProps, ComboboxSearchStylesNames } from './ComboboxSearch';

const TestContainer = createContextContainer(ComboboxSearch, Combobox, { withinPortal: false });

const defaultProps: ComboboxSearchProps = {
  leftSection: '$',
};

describe('@empoleon/core/ComboboxSearch', () => {
  tests.itSupportsSystemProps<ComboboxSearchProps, ComboboxSearchStylesNames>({
    component: TestContainer,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    classes: true,
    id: true,
    refType: HTMLInputElement,
    displayName: '@empoleon/core/ComboboxSearch',
    stylesApiSelectors: ['input', 'section', 'wrapper'],
    stylesApiName: 'Combobox',
    selector: '.empoleon-Combobox-wrapper',
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

  tests.itSupportsFocusEvents({
    component: TestContainer,
    props: defaultProps,
    selector: '.empoleon-Combobox-input',
  });
});
