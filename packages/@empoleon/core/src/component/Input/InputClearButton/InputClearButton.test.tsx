import { tests } from '@empoleon-tests/core';
import { InputClearButton, InputClearButtonProps } from './InputClearButton';

const defaultProps: InputClearButtonProps = {};

describe('@empoleon/core/InputClearButton', () => {
  tests.itSupportsSystemProps<InputClearButtonProps, 'root'>({
    component: InputClearButton,
    props: defaultProps,
    polymorphic: true,
    styleProps: true,
    extend: true,
    variant: true,
    size: true,
    refType: HTMLButtonElement,
    displayName: '@empoleon/core/InputClearButton',
    stylesApiSelectors: ['root'],
  });
});
