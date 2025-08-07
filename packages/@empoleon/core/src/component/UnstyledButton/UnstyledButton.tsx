import { splitProps } from 'solid-js';
import {
  Box,
  BoxComponentProps,
  polymorphicFactory,
  PolymorphicFactory,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import classes from './UnstyledButton.module.css';

export type UnstyledButtonStylesNames = 'root';

export interface UnstyledButtonProps
  extends Omit<BoxComponentProps, 'vars' | 'variant'>,
    StylesApiProps<UnstyledButtonFactory> {
  __staticSelector?: string;
}

const defaultProps = {
  __staticSelector: 'UnstyledButton',
} satisfies Partial<UnstyledButtonProps>;

export type UnstyledButtonFactory = PolymorphicFactory<{
  props: UnstyledButtonProps;
  stylesNames: UnstyledButtonStylesNames;
  defaultComponent: 'button';
  defaultRef: HTMLButtonElement;
}>;

export const UnstyledButton = polymorphicFactory<UnstyledButtonFactory>((_props: UnstyledButtonProps & { component?: any, ref?: any }) => {
    const props = useProps('UnstyledButton', defaultProps, _props);
    const [local, others] = splitProps(props, [
      'className',
      'component',
      '__staticSelector',
      'unstyled',
      'classNames',
      'styles',
      'style',
      'attributes',
      'ref'
    ]);

    const getStyles = useStyles<UnstyledButtonFactory>({
      name: local.__staticSelector!,
      props,
      classes,
      className: local.className,
      style: local.style,
      classNames: local.classNames,
      styles: local.styles,
      unstyled: local.unstyled,
      attributes: local.attributes,
    });

    return (
      <Box
        {...getStyles('root', { focusable: true })}
        component={local.component ?? 'button'}
        ref={local.ref}
        type={local.component === 'button' ? 'button' : undefined}
        {...others}
      />
    );
  }
);

UnstyledButton.classes = classes;
UnstyledButton.displayName = '@empoleon/core/UnstyledButton';
