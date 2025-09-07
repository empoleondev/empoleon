import { createContextContainer, patchConsoleError, render, tests } from '@empoleon-tests/core';
import { Combobox } from '../Combobox';
import { ComboboxEmpty, ComboboxEmptyProps, ComboboxEmptyStylesNames } from './ComboboxEmpty';

const TestContainer = createContextContainer(ComboboxEmpty, Combobox, { withinPortal: false });

const defaultProps: ComboboxEmptyProps = {};

describe('@empoleon/core/ComboboxEmpty', () => {
  tests.itSupportsSystemProps<ComboboxEmptyProps, ComboboxEmptyStylesNames>({
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
    displayName: '@empoleon/core/ComboboxEmpty',
    stylesApiSelectors: ['empty'],
    stylesApiName: 'Combobox',
    selector: '.empoleon-Combobox-empty',
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
});
