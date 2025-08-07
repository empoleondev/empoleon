import { BoxProps, ElementProps, factory, Factory, StylesApiProps, useProps } from '../../core';
import { __BaseInputProps, __InputStylesNames } from '../Input';
import { InputBase } from '../InputBase';
import { PillsInputProvider } from './PillsInput.context';
import { PillsInputField } from './PillsInputField/PillsInputField';
import { splitProps } from 'solid-js';

export interface PillsInputProps
  extends BoxProps,
    __BaseInputProps,
    StylesApiProps<PillsInputFactory>,
    ElementProps<'div', 'size'> {
  __stylesApiProps?: Record<string, any>;
  __staticSelector?: string;
}

export type PillsInputFactory = Factory<{
  props: PillsInputProps;
  ref: HTMLInputElement;
  stylesNames: __InputStylesNames;
  staticComponents: {
    Field: typeof PillsInputField;
  };
}>;

const defaultProps = {
  size: 'sm',
} satisfies Partial<PillsInputProps>;

export const PillsInput = factory<PillsInputFactory>(_props => {
  const props = useProps('PillsInput', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'onMouseDown',
    'onClick',
    'size',
    'disabled',
    '__staticSelector',
    'error',
    'variant',
    'ref'
  ]);

  const fieldRef = null as HTMLInputElement | null;

  return (
    <PillsInputProvider value={{ fieldRef, size: local.size!, disabled: local.disabled, hasError: !!local.error, variant: local.variant }}>
      <InputBase
        size={local.size}
        error={local.error}
        variant={local.variant}
        component="div"
        ref={local.ref}
        onMouseDown={(event: MouseEvent & {
          currentTarget: HTMLDivElement;
          target: Element;
      }) => {
          event.preventDefault();
          typeof local.onMouseDown === "function" && local.onMouseDown?.(event);
          fieldRef?.focus();
        }}
        onClick={(event: MouseEvent & {
          currentTarget: HTMLDivElement;
          target: Element;
      }) => {
          event.preventDefault();
          const fieldset = event.currentTarget.closest('fieldset');
          if (!fieldset?.disabled) {
            fieldRef?.focus();
            typeof local.onClick === "function" && local.onClick?.(event);
          }
        }}
        {...others}
        multiline
        disabled={local.disabled}
        __staticSelector={local.__staticSelector || 'PillsInput'}
        withAria={false}
      >
        {local.children}
      </InputBase>
    </PillsInputProvider>
  );
});

PillsInput.displayName = '@empoleon/core/PillsInput';
PillsInput.Field = PillsInputField;
