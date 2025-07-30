import { tests } from '@empoleon-tests/core';
import {
  InputPlaceholder,
  InputPlaceholderProps,
  InputPlaceholderStylesNames,
} from './InputPlaceholder';

const defaultProps: InputPlaceholderProps = {};

describe('@empoleon/core/InputPlaceholder', () => {
  tests.itSupportsSystemProps<InputPlaceholderProps, InputPlaceholderStylesNames>({
    component: InputPlaceholder,
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
    refType: HTMLSpanElement,
    displayName: '@empoleon/core/InputPlaceholder',
    stylesApiSelectors: ['placeholder'],
  });
});
