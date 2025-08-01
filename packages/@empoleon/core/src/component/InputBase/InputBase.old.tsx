import { inputDefaultProps, inputStylesApiSelectors, tests } from '@empoleon-tests/core';
import { __InputStylesNames } from '../Input';
import { InputBase, InputBaseProps } from './InputBase';

const defaultProps: InputBaseProps = {
  ...inputDefaultProps,
};

describe('@empoleon/core/InputBase', () => {
  tests.axe([
    <InputBase aria-label="test-label" />,
    <InputBase label="test-label" />,
    <InputBase label="test-label" error />,
    <InputBase label="test-label" error="test-error" id="test" />,
    <InputBase label="test-label" description="test-description" />,
  ]);

  tests.itSupportsSystemProps<InputBaseProps, __InputStylesNames>({
    component: InputBase,
    props: defaultProps,
    mod: true,
    polymorphic: true,
    styleProps: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLInputElement,
    displayName: '@empoleon/core/InputBase',
    stylesApiSelectors: [...inputStylesApiSelectors],
    polymorphicSelector: '.empoleon-InputBase-input',
  });

  tests.itSupportsInputProps<InputBaseProps>({
    component: InputBase,
    props: defaultProps,
    selector: 'input',
  });
});
