import { createEffect, JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getDefaultZIndex,
  EmpoleonSpacing,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { AppShellProvider } from './AppShell.context';
import {
  AppShellAsideConfiguration,
  AppShellFooterConfiguration,
  AppShellHeaderConfiguration,
  AppShellNavbarConfiguration,
  AppShellResponsiveSize,
} from './AppShell.types';
import { AppShellAside } from './AppShellAside/AppShellAside';
import { AppShellFooter } from './AppShellFooter/AppShellFooter';
import { AppShellHeader } from './AppShellHeader/AppShellHeader';
import { AppShellMain } from './AppShellMain/AppShellMain';
import { AppShellMediaStyles } from './AppShellMediaStyles/AppShellMediaStyles';
import { AppShellNavbar } from './AppShellNavbar/AppShellNavbar';
import { AppShellSection } from './AppShellSection/AppShellSection';
import { useResizing } from './use-resizing/use-resizing';
import classes from './AppShell.module.css';

export type AppShellStylesNames =
  | 'root'
  | 'navbar'
  | 'main'
  | 'header'
  | 'footer'
  | 'aside'
  | 'section';

export type AppShellCssVariables = {
  root: '--app-shell-transition-duration' | '--app-shell-transition-timing-function';
};

export interface AppShellProps
  extends BoxProps,
    StylesApiProps<AppShellFactory>,
    ElementProps<'div'> {
  /** Determines whether associated components should have a border, `true` by default */
  withBorder?: boolean;

  /** Controls padding of the main section, `0` by default. !important!: use `padding` prop instead of `p`. */
  padding?: EmpoleonSpacing | AppShellResponsiveSize;

  /** AppShell.Navbar configuration, controls width, breakpoints and collapsed state. Required if you use AppShell.Navbar component. */
  navbar?: AppShellNavbarConfiguration;

  /** AppShell.Aside configuration, controls width, breakpoints and collapsed state. Required if you use AppShell.Aside component. */
  aside?: AppShellAsideConfiguration;

  /** AppShell.Header configuration, controls height, offset and collapsed state. Required if you use AppShell.Header component. */
  header?: AppShellHeaderConfiguration;

  /** AppShell.Footer configuration, controls height, offset and collapsed state. Required if you use AppShell.Footer component. */
  footer?: AppShellFooterConfiguration;

  /** Duration of all transitions in ms, `200` by default */
  transitionDuration?: number;

  /** Timing function of all transitions, `ease` by default */
  transitionTimingFunction?: JSX.CSSProperties['transition-timing-function'];

  /** `z-index` of all associated elements, `100` by default */
  zIndex?: string | number;

  /** Determines how Navbar/Aside are arranged relative to Header/Footer, `default` by default */
  layout?: 'default' | 'alt';

  /** If set, Navbar, Aside, Header and Footer components be hidden */
  disabled?: boolean;

  /** Determines whether Header and Footer components should include styles to offset scrollbars. Based on `react-remove-scroll`. `true` by default for `layout="default"`, `false` for `layout="alt"` */
  offsetScrollbars?: boolean;
}

export type AppShellFactory = Factory<{
  props: AppShellProps;
  ref: HTMLDivElement;
  stylesNames: AppShellStylesNames;
  vars: AppShellCssVariables;
  staticComponents: {
    Navbar: typeof AppShellNavbar;
    Header: typeof AppShellHeader;
    Main: typeof AppShellMain;
    Aside: typeof AppShellAside;
    Footer: typeof AppShellFooter;
    Section: typeof AppShellSection;
  };
}>;

const defaultProps: Partial<AppShellProps> = {
  withBorder: true,
  padding: 0,
  transitionDuration: 200,
  transitionTimingFunction: 'ease',
  zIndex: getDefaultZIndex('app'),
} satisfies Partial<AppShellProps>;

const varsResolver = createVarsResolver<AppShellFactory>(
  (_, props) => ({
    root: {
      '--app-shell-transition-duration': `${props.transitionDuration}ms`,
      '--app-shell-transition-timing-function': props.transitionTimingFunction,
    },
  })
);

export const AppShell = factory<AppShellFactory>(_props => {
  const props = useProps('AppShell', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'navbar',
    'withBorder',
    'padding',
    'transitionDuration',
    'transitionTimingFunction',
    'header',
    'zIndex',
    'layout',
    'disabled',
    'aside',
    'footer',
    'offsetScrollbars',
    'mod',
    'attributes',
    'ref'
  ]);

  const offsetScrollbars = local.layout !== 'alt';

  const getStyles = useStyles<AppShellFactory>({
    name: 'AppShell',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  const resizing = useResizing({ disabled: local.disabled, transitionDuration: local.transitionDuration });

  return (
    <AppShellProvider value={{ getStyles, withBorder: local.withBorder, zIndex: local.zIndex, disabled: local.disabled, offsetScrollbars }}>
      <AppShellMediaStyles
        navbar={() => local.navbar}
        header={() => local.header}
        aside={() => local.aside}
        footer={() => local.footer}
        padding={() => local.padding}
      />
      <Box
        ref={local.ref}
        {...getStyles('root')}
        mod={[{ resizing, layout: local.layout, disabled: local.disabled }, local.mod]}
        {...others}
      />
    </AppShellProvider>
  );
});

AppShell.classes = classes;
AppShell.displayName = '@empoleon/core/AppShell';
AppShell.Navbar = AppShellNavbar;
AppShell.Header = AppShellHeader;
AppShell.Main = AppShellMain;
AppShell.Aside = AppShellAside;
AppShell.Footer = AppShellFooter;
AppShell.Section = AppShellSection;
