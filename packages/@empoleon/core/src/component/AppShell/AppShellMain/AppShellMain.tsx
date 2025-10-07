import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { useAppShellContext } from '../AppShell.context';
import classes from '../AppShell.module.css';

export type AppShellMainStylesNames = 'main';

export interface AppShellMainProps
  extends BoxProps,
    CompoundStylesApiProps<AppShellMainFactory>,
    ElementProps<'main'> {}

export type AppShellMainFactory = Factory<{
  props: AppShellMainProps;
  ref: HTMLElement;
  stylesNames: AppShellMainStylesNames;
  compound: true;
}>;

const defaultProps: Partial<AppShellMainProps> = {};

export const AppShellMain = factory<AppShellMainFactory>((_props) => {
  const props = useProps('AppShellMain', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'ref',
  ]);

  const ctx = useAppShellContext();

  return (
    <Box
      component="main"
      ref={local.ref}
      {...ctx.getStyles('main', {
        className: local.className,
        style: local.style,
        classNames: local.classNames,
        styles: local.styles,
      })}
      {...others}
    />
  );
});

AppShellMain.classes = classes;
AppShellMain.displayName = '@empoleon/core/AppShellMain';
