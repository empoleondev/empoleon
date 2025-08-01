import cx from 'clsx';
import { polymorphicFactory, PolymorphicFactory, useProps } from '../../core';
import { Text, TextCssVariables, TextProps, TextStylesNames, TextVariant } from '../Text';
import classes from './Anchor.module.css';
import { splitProps } from 'solid-js';

export type AnchorStylesNames = TextStylesNames;
export type AnchorVariant = TextVariant;
export type AnchorCssVariables = TextCssVariables;

export interface AnchorProps extends Omit<TextProps, 'span'> {
  /** Determines in which cases link should have `text-decoration: underline` styles, `hover` by default */
  underline?: 'always' | 'hover' | 'not-hover' | 'never';
}

export type AnchorFactory = PolymorphicFactory<{
  props: AnchorProps;
  defaultComponent: 'a';
  defaultRef: HTMLAnchorElement;
  stylesNames: AnchorStylesNames;
  vars: AnchorCssVariables;
  variant: AnchorVariant;
}>;

const defaultProps: Partial<AnchorProps> = {
  underline: 'hover',
};

export const Anchor = polymorphicFactory<AnchorFactory>(_props => {
  const props = useProps('Anchor', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'underline',
    'className',
    'unstyled',
    'mod',
    'ref'
  ]);

  return (
    <Text
      component="a"
      ref={local.ref}
      className={cx({ [classes.root]: !local.unstyled }, local.className)}
      {...others}
      mod={[{ underline: local.underline }, local.mod]}
      __staticSelector="Anchor"
      unstyled={local.unstyled}
    />
  );
});

Anchor.classes = classes;
Anchor.displayName = '@empoleon/core/Anchor';
