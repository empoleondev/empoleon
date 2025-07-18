import { splitProps } from 'solid-js';
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

export type AppShellNavbarStylesNames = 'navbar';

export interface AppShellNavbarProps
  extends BoxProps,
    StylesApiProps<AppShellNavbarFactory>,
    ElementProps<'div'> {
  /** Determines whether component should have a border, overrides `withBorder` prop on `AppShell` component */
  withBorder?: boolean;

  /** Component `z-index`, by default inherited from the `AppShell` */
  zIndex?: string | number;
}

export type AppShellNavbarFactory = Factory<{
  props: AppShellNavbarProps;
  ref: HTMLElement;
  stylesNames: AppShellNavbarStylesNames;
}>;

const defaultProps: Partial<AppShellNavbarProps> = {};

export const AppShellNavbar = factory<AppShellNavbarFactory>(_props => {
  const props = useProps('AppShellNavbar', defaultProps, _props);
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
    // @ts-ignore
    <Box
      component="nav"
      ref={local.ref}
      mod={[{ 'with-border': local.withBorder ?? ctx.withBorder }, local.mod]}
      {...ctx.getStyles('navbar', { className: local.className, classNames: local.classNames, styles: local.styles, style: local.style })}
      {...others}
      __vars={{
        '--app-shell-navbar-z-index': `calc(${local.zIndex ?? ctx.zIndex} + 1)`,
      }}
    />
  );
});

AppShellNavbar.classes = classes;
AppShellNavbar.displayName = '@empoleon/core/AppShellNavbar';
