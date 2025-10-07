import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  EmpoleonFontSize,
  factory,
  Factory,
  getFontSize,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../../core';
import { useInputWrapperContext } from '../InputWrapper.context';
import classes from '../Input.module.css';

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

const varsResolver = createVarsResolver<InputDescriptionFactory>((_, props) => ({
  description: {
    '--input-description-size':
      props.size === undefined ? undefined : `calc(${getFontSize(props.size)} - ${rem(2)})`,
  },
}));

export const InputDescription = factory<InputDescriptionFactory>((_props) => {
  const props = useProps('InputDescription', null, _props);
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
    'attributes',
    'variant',
    'ref',
  ]);

  const __inheritStyles = local.__inheritStyles || true;

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

  const getStyles = ((__inheritStyles || true) && ctx?.getStyles) || _getStyles;

  return (
    <Box
      component="p"
      ref={local.ref}
      variant={local.variant}
      size={local.size}
      {...getStyles(
        'description',
        ctx?.getStyles ? { className: local.className, style: local.style } : undefined
      )}
      {...others}
    />
  );
});

InputDescription.classes = classes;
InputDescription.displayName = '@empoleon/core/InputDescription';
