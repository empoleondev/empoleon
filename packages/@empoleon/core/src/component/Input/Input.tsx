import { splitProps, JSX, createEffect, createMemo } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  DataAttributes,
  extractStyleProps,
  getFontSize,
  getRadius,
  getSize,
  EmpoleonRadius,
  EmpoleonSize,
  polymorphicFactory,
  PolymorphicFactory,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { InputContext } from './Input.context';
import { InputClearButton } from './InputClearButton/InputClearButton';
import { InputDescription } from './InputDescription/InputDescription';
import { InputError } from './InputError/InputError';
import { InputLabel } from './InputLabel/InputLabel';
import { InputPlaceholder } from './InputPlaceholder/InputPlaceholder';
import { useInputWrapperContext } from './InputWrapper.context';
import {
  __InputWrapperProps,
  InputWrapper,
  InputWrapperStylesNames,
} from './InputWrapper/InputWrapper';
import classes from './Input.module.css';

// Required to be a separate type for docgen script
type WrapperProps = JSX.HTMLAttributes<HTMLDivElement> & DataAttributes;

export interface __BaseInputProps extends __InputWrapperProps, Omit<__InputProps, 'wrapperProps'> {
  /** Props passed down to the root element */
  wrapperProps?: JSX.HTMLAttributes<HTMLDivElement> & DataAttributes;
}

export type __InputStylesNames = InputStylesNames | InputWrapperStylesNames;

export type InputStylesNames = 'input' | 'wrapper' | 'section';
export type InputVariant = 'default' | 'filled' | 'unstyled';
export type InputCssVariables = {
  wrapper:
    | '--input-height'
    | '--input-fz'
    | '--input-radius'
    | '--input-left-section-width'
    | '--input-right-section-width'
    | '--input-left-section-pointer-events'
    | '--input-right-section-pointer-events'
    | '--input-padding-y'
    | '--input-margin-top'
    | '--input-margin-bottom';
};

export interface InputStylesCtx {
  offsetTop: boolean | undefined;
  offsetBottom: boolean | undefined;
}

export interface __InputProps {
  /** Content section rendered on the left side of the input */
  leftSection?: JSX.Element;

  /** Left section width, used to set `width` of the section and input `padding-left`, by default equals to the input height */
  leftSectionWidth?: JSX.CSSProperties['width'];

  /** Props passed down to the `leftSection` element */
  leftSectionProps?: JSX.HTMLAttributes<HTMLDivElement>;

  /** Sets `pointer-events` styles on the `leftSection` element, `'none'` by default */
  leftSectionPointerEvents?: JSX.CSSProperties['pointer-events'];

  /** Content section rendered on the right side of the input */
  rightSection?: JSX.Element;

  /** Right section width, used to set `width` of the section and input `padding-right`, by default equals to the input height */
  rightSectionWidth?: JSX.CSSProperties['width'];

  /** Props passed down to the `rightSection` element */
  rightSectionProps?: JSX.HTMLAttributes<HTMLDivElement>;

  /** Sets `pointer-events` styles on the `rightSection` element, `'none'` by default */
  rightSectionPointerEvents?: JSX.CSSProperties['pointer-events'];

  /** Props passed down to the root element of the `Input` component */
  wrapperProps?: JSX.HTMLAttributes<HTMLDivElement> & DataAttributes;

  /** Sets `required` attribute on the `input` element */
  required?: boolean;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `theme.defaultRadius` by default */
  radius?: EmpoleonRadius;

  /** Sets `disabled` attribute on the `input` element */
  disabled?: boolean;

  /** Controls input `height` and horizontal `padding`, `'sm'` by default */
  size?: EmpoleonSize | (string & {});

  /** Determines whether the input should have `cursor: pointer` style, `false` by default */
  pointer?: boolean;

  /** Determines whether the input should have red border and red text color when the `error` prop is set, `true` by default */
  withErrorStyles?: boolean;

  /** `size` prop added to the input element */
  inputSize?: string;

  /** Section to be displayed when the input is `__clearable` and `rightSection` is not defined */
  __clearSection?: JSX.Element;

  /** Determines whether the `__clearSection` should be displayed if it is passed to the component, has no effect if `rightSection` is defined */
  __clearable?: boolean;

  /** Right section displayed when both `__clearSection` and `rightSection` are not defined */
  __defaultRightSection?: JSX.Element;
}

export interface InputProps extends BoxProps, __InputProps, StylesApiProps<InputFactory> {
  __staticSelector?: string;

  /** Props passed to Styles API context, replaces `Input.Wrapper` props */
  __stylesApiProps?: Record<string, any>;

  /** Determines whether the input should have error styles and `aria-invalid` attribute */
  error?: JSX.Element;

  /** Determines whether the input can have multiple lines, for example when `component="textarea"`, `false` by default */
  multiline?: boolean;

  /** Input element id */
  id?: string;

  /** Determines whether `aria-` and other accessibility attributes should be added to the input, `true` by default */
  withAria?: boolean;

  /** Props passed down to the root element of the `Input` component */
  wrapperProps?: WrapperProps;

  /** Uncontrolled initial value for the input */
  defaultValue?: string | number;

  /** Uncontrolled initial value for the input */
  value?: string | number;
}

export type InputFactory = PolymorphicFactory<{
  props: InputProps;
  defaultRef: HTMLInputElement;
  defaultComponent: 'input';
  stylesNames: InputStylesNames;
  variant: InputVariant;
  vars: InputCssVariables;
  ctx: InputStylesCtx;
  staticComponents: {
    Label: typeof InputLabel;
    Error: typeof InputError;
    Description: typeof InputDescription;
    Placeholder: typeof InputPlaceholder;
    Wrapper: typeof InputWrapper;
    ClearButton: typeof InputClearButton;
  };
}>;

const defaultProps = {
  variant: 'default',
  leftSectionPointerEvents: 'none',
  rightSectionPointerEvents: 'none',
  withAria: true,
  withErrorStyles: true,
} satisfies Partial<InputProps>;

const varsResolver = createVarsResolver<InputFactory>((_, props, ctx) => ({
  wrapper: {
    '--input-margin-top': ctx.offsetTop ? 'calc(var(--empoleon-spacing-xs) / 2)' : undefined,
    '--input-margin-bottom': ctx.offsetBottom ? 'calc(var(--empoleon-spacing-xs) / 2)' : undefined,
    '--input-height': getSize(props.size, 'input-height'),
    '--input-fz': getFontSize(props.size),
    '--input-radius': props.radius === undefined ? undefined : getRadius(props.radius),
    '--input-left-section-width':
      props.leftSectionWidth !== undefined ? rem(props.leftSectionWidth) : undefined,
    '--input-right-section-width':
      props.rightSectionWidth !== undefined ? rem(props.rightSectionWidth) : undefined,
    '--input-padding-y': props.multiline ? getSize(props.size, 'input-padding-y') : undefined,
    '--input-left-section-pointer-events': props.leftSectionPointerEvents,
    '--input-right-section-pointer-events': props.rightSectionPointerEvents,
  },
}));

export const Input = polymorphicFactory<InputFactory>(_props => {
  const props = useProps('Input', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'required',
    '__staticSelector',
    '__stylesApiProps',
    'size',
    'wrapperProps',
    'error',
    'disabled',
    'leftSection',
    'leftSectionProps',
    'leftSectionWidth',
    'rightSection',
    'rightSectionProps',
    'rightSectionWidth',
    'rightSectionPointerEvents',
    'leftSectionPointerEvents',
    'variant',
    'vars',
    'pointer',
    'multiline',
    'radius',
    'id',
    'withAria',
    'withErrorStyles',
    'mod',
    'inputSize',
    '__clearSection',
    '__clearable',
    '__defaultRightSection',
    'ref'
  ]);

  const { styleProps, rest } = extractStyleProps(others);
  const ctx = useInputWrapperContext();
  const stylesCtx: InputStylesCtx = { offsetBottom: ctx?.offsetBottom, offsetTop: ctx?.offsetTop };

  const getStyles = useStyles<InputFactory>({
    name: ['Input', local.__staticSelector],
    props: local.__stylesApiProps || props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    stylesCtx,
    rootSelector: 'wrapper',
    vars: local.vars,
    varsResolver,
  });

  const ariaAttributes = () => local.withAria
    ? {
        required: local.required,
        disabled: local.disabled,
        'aria-invalid': !!local.error,
        'aria-describedby': ctx?.describedBy,
        'aria-labelledby': ctx?.labelId, // for solidjs
        id: ctx?.inputId || local.id,
      }
    : {};

  const _rightSection: JSX.Element = local.rightSection || (local.__clearable && local.__clearSection) || local.__defaultRightSection;
  const valueProp = (v: any, dv: any) => {
    if (v !== undefined) {
      return {
        value: v,
        onInput: (e: Event) => {
          (rest as any).onChange?.(e);
          (e.target as any).value = v;
        }
      };
    }
    return dv !== undefined ? { value: dv } : undefined;
  };

  const { value: v, defaultValue: dv } = rest;

  const errorMod = createMemo(() => {
    const errorValue = typeof local.error === 'function' ? (local.error as () => any)() : local.error;
    const result = !!errorValue && local.withErrorStyles;
    return result;
  });

  return (
    <InputContext value={{ size: local.size || 'sm' }}>
      <Box
        {...getStyles('wrapper')}
        {...styleProps as any}
        {...local.wrapperProps}
        mod={[
          {
            error: errorMod,
            pointer: local.pointer,
            disabled: local.disabled,
            multiline: local.multiline,
            'data-with-right-section': !!_rightSection,
            'data-with-left-section': !!local.leftSection,
          },
          local.mod,
        ]}
        variant={local.variant}
        size={local.size}
      >
        {local.leftSection && (
          <div
            {...local.leftSectionProps}
            data-position="left"
            {...getStyles('section', {
              className: local.leftSectionProps?.class,
              style: local.leftSectionProps?.style as any,
            })}
          >
            {local.leftSection}
          </div>
        )}

        <Box
          component="input"
          {...valueProp(v, dv)}
          {...rest}
          {...ariaAttributes()}
          ref={local.ref}
          required={local.required}
          mod={{
            disabled: local.disabled,
            error: errorMod,
          }}
          variant={local.variant}
          __size={local.inputSize}
          {...getStyles('input')}
        />

        {_rightSection && (
          <div
            {...local.rightSectionProps}
            data-position="right"
            {...getStyles('section', {
              className: local.rightSectionProps?.class,
              style: local.rightSectionProps?.style as any,
            })}
          >
            {_rightSection}
          </div>
        )}
      </Box>
    </InputContext>
  );
});

Input.classes = classes;
Input.Wrapper = InputWrapper;
Input.Label = InputLabel;
Input.Error = InputError;
Input.Description = InputDescription;
Input.Placeholder = InputPlaceholder;
Input.ClearButton = InputClearButton;
Input.displayName = '@empoleon/core/Input';
