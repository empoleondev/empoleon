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
import type { AppShellCompoundProps } from '../AppShell.types';
import classes from '../AppShell.module.css';
import { splitProps } from 'solid-js';

export type AppShellHeaderStylesNames = 'header';

export interface AppShellHeaderProps
  extends BoxProps,
    AppShellCompoundProps,
    StylesApiProps<AppShellHeaderFactory>,
    ElementProps<'header'> {}

export type AppShellHeaderFactory = Factory<{
  props: AppShellHeaderProps;
  ref: HTMLElement;
  stylesNames: AppShellHeaderStylesNames;
}>;

const defaultProps: Partial<AppShellHeaderProps> = {};

export const AppShellHeader = factory<AppShellHeaderFactory>(_props => {
  const props = useProps('AppShellHeader', defaultProps, _props);
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
      component="header"
      ref={local.ref}
      mod={[{ 'with-border': local.withBorder ?? ctx.withBorder }, local.mod]}
      {...ctx.getStyles('header', {
        className: cx({ [RemoveScroll.classNames.zeroRight]: ctx.offsetScrollbars }, local.className),
        classNames: local.classNames,
        styles: local.styles,
        style: local.style,
      })}
      {...others}
      __vars={{ '--app-shell-header-z-index': (local.zIndex ?? ctx.zIndex)?.toString() }}
    />
  );
});

AppShellHeader.classes = classes;
AppShellHeader.displayName = '@empoleon/core/AppShellHeader';
