import { inputDefaultProps, inputStylesApiSelectors, tests } from '@empoleon-tests/core';
import { __InputStylesNames } from '../Input';
import { ColorInput, ColorInputProps } from './ColorInput';

const defaultProps: ColorInputProps = {
  ...inputDefaultProps,
};

describe('@empoleon/core/ColorInput', () => {
  tests.axe([
    () => <ColorInput aria-label="test-label" />,
    () => <ColorInput label="test-label" />,
    () => <ColorInput label="test-label" error />,
    () => <ColorInput label="test-label" error="test-error" id="test" />,
    () => <ColorInput label="test-label" description="test-description" />,
  ]);

  tests.itSupportsSystemProps<ColorInputProps, __InputStylesNames>({
    component: ColorInput,
    props: defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLInputElement,
    displayName: '@empoleon/core/ColorInput',
    stylesApiSelectors: [...inputStylesApiSelectors],
  });

  tests.itSupportsInputProps<ColorInputProps>({
    component: ColorInput,
    props: defaultProps,
    selector: 'input',
  });
});
