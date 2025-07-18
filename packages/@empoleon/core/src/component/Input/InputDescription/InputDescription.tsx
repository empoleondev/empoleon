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

export type InputDescriptionStylesNames = 'description';
export type InputDescriptionCssVariables = {
  description: '--input-description-size';
};

export interface InputDescriptionProps
  extends BoxProps,
    StylesApiProps<InputDescriptionFactory>,
    ElementProps<'div'> {
  __staticSelector?: string;
  __inheritStyles?: boolean;

  /** Controls description `font-size`, `'sm'` by default */
  size?: EmpoleonFontSize;
}

export type InputDescriptionFactory = Factory<{
  props: InputDescriptionProps;
  ref: HTMLParagraphElement;
  stylesNames: InputDescriptionStylesNames;
  vars: InputDescriptionCssVariables;
}>;

const defaultProps: Partial<InputDescriptionProps> = {};

const varsResolver = createVarsResolver<InputDescriptionFactory>((_, { size }) => ({
  description: {
    '--input-description-size':
      size === undefined ? undefined : `calc(${getFontSize(size)} - ${rem(2)})`,
  },
}));

export const InputDescription = factory<InputDescriptionFactory>(_props => {
  const props = useProps('InputDescription', defaultProps, _props);
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

  const ctx = useInputWrapperContext();

  const _getStyles = useStyles<InputDescriptionFactory>({
    name: ['InputWrapper', local.__staticSelector],
    props,
    classes,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    rootSelector: 'description',
    vars: local.vars,
    varsResolver,
  });

  const getStyles = (local.__inheritStyles && ctx?.getStyles) || _getStyles;

  return (
    <Box
      component="p"
      ref={local.ref}
      variant={local.variant}
      size={local.size}
      {...getStyles('description', ctx?.getStyles ? { className: local.className, style: local.style } : undefined)}
      {...others}
    />
  );
});

InputDescription.classes = classes;
InputDescription.displayName = '@empoleon/core/InputDescription';
