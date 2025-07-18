import { tests } from '@empoleon-tests/core';
import { InputError, InputErrorProps, InputErrorStylesNames } from './InputError';

const defaultProps: InputErrorProps = {};

describe('@empoleon/core/InputError', () => {
  tests.itSupportsSystemProps<InputErrorProps, InputErrorStylesNames>({
    component: InputError,
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
    refType: HTMLParagraphElement,
    displayName: '@empoleon/core/InputError',
    stylesApiName: 'InputWrapper',
    stylesApiSelectors: ['error'],
  });
});
