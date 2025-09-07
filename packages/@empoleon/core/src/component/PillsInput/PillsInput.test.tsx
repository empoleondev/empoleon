import { inputDefaultProps, inputStylesApiSelectors, tests } from '@empoleon-tests/core';
import { __InputStylesNames } from '../Input';
import { PillsInput, PillsInputProps } from './PillsInput';

const defaultProps: PillsInputProps = {
  ...inputDefaultProps,
};

describe('@empoleon/core/PillsInput', () => {
  tests.axe([
    () => <PillsInput label="test-label">
      <PillsInput.Field />
    </PillsInput>,

    () => <PillsInput label="test-label" description="test-description">
      <PillsInput.Field />
    </PillsInput>,

    () => <PillsInput label="test-label" error="test-error">
      <PillsInput.Field />
    </PillsInput>,

    () => <PillsInput>
      <PillsInput.Field aria-label="test-label" />
    </PillsInput>,
  ]);

  tests.itSupportsSystemProps<PillsInputProps, __InputStylesNames>({
    component: PillsInput,
    props: defaultProps,
    mod: true,
    styleProps: true,
    children: true,
    extend: true,
    withProps: true,
    variant: true,
    size: true,
    refType: HTMLDivElement,
    displayName: '@empoleon/core/PillsInput',
    stylesApiSelectors: [...inputStylesApiSelectors],
  });

  tests.itSupportsInputWrapperProps<PillsInputProps>({
    component: PillsInput,
    props: defaultProps,
  });

  tests.itSupportsInputSections<PillsInputProps>({
    component: PillsInput,
    props: defaultProps,
  });
});
