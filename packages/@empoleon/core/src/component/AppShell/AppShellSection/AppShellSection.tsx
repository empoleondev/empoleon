import { splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  polymorphicFactory,
  PolymorphicFactory,
  useProps,
} from '../../../core';
import { useAppShellContext } from '../AppShell.context';
import classes from '../AppShell.module.css';

export type AppShellSectionStylesNames = 'section';

export interface AppShellSectionProps
  extends BoxProps,
    CompoundStylesApiProps<AppShellSectionFactory> {
  /** Determines whether the section should take all available space, `false` by default */
  grow?: boolean;
}

export type AppShellSectionFactory = PolymorphicFactory<{
  props: AppShellSectionProps;
  defaultRef: HTMLDivElement;
  defaultComponent: 'div';
  stylesNames: AppShellSectionStylesNames;
  compound: true;
}>;

const defaultProps: Partial<AppShellSectionProps> = {};

export const AppShellSection = polymorphicFactory<AppShellSectionFactory>((_props) => {
  const props = useProps('AppShellSection', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'grow',
    'mod',
    'ref',
  ]);

  const ctx = useAppShellContext();

  return (
    <Box
      ref={local.ref}
      mod={[{ grow: local.grow }, local.mod]}
      {...ctx.getStyles('section', {
        className: local.className,
        style: local.style,
        classNames: local.classNames,
        styles: local.styles,
      })}
      {...others}
    />
  );
});

AppShellSection.classes = classes;
AppShellSection.displayName = '@empoleon/core/AppShellSection';
