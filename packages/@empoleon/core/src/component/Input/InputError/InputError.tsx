import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getFontSize,
  EmpoleonFontSize,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import { useInputWrapperContext } from '../InputWrapper.context';
import classes from '../Input.module.css';
import { splitProps } from 'solid-js';

export type InputErrorStylesNames = 'error';
export type InputErrorCssVariables = {
  error: '--input-error-size';
};

export interface InputErrorProps
  extends BoxProps,
    StylesApiProps<InputErrorFactory>,
    ElementProps<'div'> {
  __staticSelector?: string;
  __inheritStyles?: boolean;

  /** Controls error `font-size`, `'sm'` by default */
  size?: EmpoleonFontSize;
}

export type InputErrorFactory = Factory<{
  props: InputErrorProps;
  ref: HTMLParagraphElement;
  stylesNames: InputErrorStylesNames;
  vars: InputErrorCssVariables;
}>;

const varsResolver = createVarsResolver<InputErrorFactory>((_, { size }) => ({
  error: {
    '--input-error-size': size === undefined ? undefined : `calc(${getFontSize(size)} - ${rem(2)})`,
  },
}));

export const InputError = factory<InputErrorFactory>(_props => {
  const props = useProps('InputError', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'size',
    '__staticSelector',
    '__inheritStyles',
    'variant',
    'ref'
  ]);

  const _getStyles = useStyles<InputErrorFactory>({
    name: ['InputWrapper', local.__staticSelector],
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    rootSelector: 'error',
    vars: local.vars,
    varsResolver,
  });

  const __inheritStyles = local.__inheritStyles || true;

  const ctx = useInputWrapperContext();
  const getStyles = (__inheritStyles && ctx?.getStyles) || _getStyles;

  return (
    <Box
      component="p"
      ref={local.ref}
      variant={local.variant}
      size={local.size}
      {...getStyles('error', ctx?.getStyles ? { className: local.className, style: local.style } : undefined)}
      {...others}
    />
  );
});

InputError.classes = classes;
InputError.displayName = '@empoleon/core/InputError';
