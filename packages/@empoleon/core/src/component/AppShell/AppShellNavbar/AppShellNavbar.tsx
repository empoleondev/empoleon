import { Show, splitProps } from 'solid-js';
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
import type { AppShellCompoundProps } from '../AppShell.types';
import classes from '../AppShell.module.css';

export type AppShellNavbarStylesNames = 'navbar';

export interface AppShellNavbarProps
  extends BoxProps,
    AppShellCompoundProps,
    StylesApiProps<AppShellNavbarFactory>,
    ElementProps<'div'> {}

export type AppShellNavbarFactory = Factory<{
  props: AppShellNavbarProps;
  ref: HTMLElement;
  stylesNames: AppShellNavbarStylesNames;
}>;

export const AppShellNavbar = factory<AppShellNavbarFactory>((_props) => {
  const props = useProps('AppShellNavbar', null, _props);
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
    'ref',
  ]);

  const ctx = useAppShellContext();

  return (
    <Show when={!ctx.disabled()} fallback={null}>
      {/* @ts-ignore */}
      <Box
        component="nav"
        ref={local.ref}
        mod={[{ 'with-border': local.withBorder ?? ctx.withBorder() }, local.mod]}
        {...ctx.getStyles('navbar', {
          className: local.className,
          classNames: local.classNames,
          styles: local.styles,
          style: local.style,
        })}
        {...others}
        __vars={{
          '--app-shell-navbar-z-index': `calc(${local.zIndex ?? ctx.zIndex()} + 1)`,
        }}
      />
    </Show>
  );
});

AppShellNavbar.classes = classes;
AppShellNavbar.displayName = '@empoleon/core/AppShellNavbar';
