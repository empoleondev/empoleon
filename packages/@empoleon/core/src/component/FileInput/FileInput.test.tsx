import { inputDefaultProps, inputStylesApiSelectors, tests } from '@empoleon-tests/core';
import { __InputStylesNames } from '../Input';
import { FileInput, FileInputProps } from './FileInput';

const defaultProps: FileInputProps = {
  ...inputDefaultProps,
  placeholder: 'test-placeholder',
};

describe('@empoleon/core/FileInput', () => {
  tests.axe([() => <FileInput aria-label="test-label" />]);

  tests.itSupportsSystemProps<FileInputProps, __InputStylesNames | 'placeholder'>({
    component: FileInput,
    props: () => defaultProps,
    mod: true,
    styleProps: true,
    extend: true,
    withProps: true,
    size: true,
    variant: true,
    classes: true,
    id: true,
    refType: HTMLButtonElement,
    displayName: '@empoleon/core/FileInput',
    stylesApiSelectors: [...inputStylesApiSelectors],
    selector: '*:not(style):not([style*="display: none"])',
  });

  tests.itSupportsInputProps<FileInputProps>({
    component: FileInput,
    props: defaultProps,
    selector: 'button',
  });
});
