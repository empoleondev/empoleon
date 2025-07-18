import cx from 'clsx';
import { RemoveScroll } from '@empoleon/solid-remove-scroll';
import {
  Box,
  BoxProps,
  ElementProps,
  factory,
  Factory,
  StylesApiProps,
  useProps,
} from '../../../core';
import { useAppShellContext } from '../AppShell.context';
import classes from '../AppShell.module.css';
import { splitProps } from 'solid-js';

export type AppShellFooterStylesNames = 'footer';

export interface AppShellFooterProps
  extends BoxProps,
    StylesApiProps<AppShellFooterFactory>,
    ElementProps<'footer'> {
  /** Determines whether component should have a border, overrides `withBorder` prop on `AppShell` component */
  withBorder?: boolean;

  /** Component `z-index`, by default inherited from the `AppShell` */
  zIndex?: string | number;
}

export type AppShellFooterFactory = Factory<{
  props: AppShellFooterProps;
  ref: HTMLElement;
  stylesNames: AppShellFooterStylesNames;
}>;

const defaultProps: Partial<AppShellFooterProps> = {};

export const AppShellFooter = factory<AppShellFooterFactory>(_props => {
  const props = useProps('AppShellFooter', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'withBorder',
    'zIndex',
    'mod',
    'ref'
  ]);

  const ctx = useAppShellContext();

  if (ctx.disabled) {
    return null;
  }

  return (
    <Box
      component="footer"
      ref={local.ref}
      mod={[{ 'with-border': local.withBorder ?? ctx.withBorder }, local.mod]}
      {...ctx.getStyles('footer', {
        className: cx({ [RemoveScroll.classNames.zeroRight]: ctx.offsetScrollbars }, local.className),
        classNames: local.classNames,
        styles: local.styles,
        style: local.style,
      })}
      {...others}
      __vars={{ '--app-shell-footer-z-index': (local.zIndex ?? ctx.zIndex)?.toString() }}
    />
  );
});

AppShellFooter.classes = classes;
AppShellFooter.displayName = '@empoleon/core/AppShellFooter';
