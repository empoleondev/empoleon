import cx from 'clsx';
import { Show, splitProps } from 'solid-js';
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
import { AppShellCompoundProps } from '../AppShell.types';
import classes from '../AppShell.module.css';

export type AppShellFooterStylesNames = 'footer';

export interface AppShellFooterProps
  extends BoxProps,
    AppShellCompoundProps,
    StylesApiProps<AppShellFooterFactory>,
    ElementProps<'footer'> {}

export type AppShellFooterFactory = Factory<{
  props: AppShellFooterProps;
  ref: HTMLElement;
  stylesNames: AppShellFooterStylesNames;
}>;

const defaultProps: Partial<AppShellFooterProps> = {};

export const AppShellFooter = factory<AppShellFooterFactory>((_props) => {
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
    'ref',
  ]);

  const ctx = useAppShellContext();

  return (
    <Show when={!ctx.disabled()} fallback={null}>
      <Box
        component="footer"
        ref={local.ref}
        mod={[{ 'with-border': local.withBorder ?? ctx.withBorder() }, local.mod]}
        {...ctx.getStyles('footer', {
          className: cx(
            { [RemoveScroll.classNames.zeroRight]: ctx.offsetScrollbars },
            local.className
          ),
          classNames: local.classNames,
          styles: local.styles,
          style: local.style,
        })}
        {...others}
        __vars={{ '--app-shell-footer-z-index': (local.zIndex ?? ctx.zIndex())?.toString() }}
      />
    </Show>
  );
});

AppShellFooter.classes = classes;
AppShellFooter.displayName = '@empoleon/core/AppShellFooter';
