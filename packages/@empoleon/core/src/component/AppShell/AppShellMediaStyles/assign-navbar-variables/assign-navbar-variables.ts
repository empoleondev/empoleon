import { getBreakpointValue, keys, EmpoleonTheme, rem } from '../../../../core';
import type { AppShellProps } from '../../AppShell';
import { getBaseSize } from '../get-base-size/get-base-size';
import type { CSSVariables, MediaQueryVariables } from '../get-variables/get-variables';
import { isPrimitiveSize } from '../is-primitive-size/is-primitive-size';
import { isResponsiveSize } from '../is-responsive-size/is-responsive-size';

interface AssignNavbarVariablesInput {
  baseStyles: CSSVariables;
  minMediaStyles: MediaQueryVariables;
  maxMediaStyles: MediaQueryVariables;
  navbar: AppShellProps['navbar'] | undefined;
  theme: EmpoleonTheme;
}

export function assignNavbarVariables(props: AssignNavbarVariablesInput) {
  const navbarWidth = props.navbar?.width;
  const collapsedNavbarTransform = 'translateX(calc(var(--app-shell-navbar-width) * -1))';
  const collapsedNavbarTransformRtl = 'translateX(var(--app-shell-navbar-width))';

  if (props.navbar?.breakpoint && !props.navbar?.collapsed?.mobile) {
    props.maxMediaStyles[props.navbar?.breakpoint] = props.maxMediaStyles[props.navbar?.breakpoint] || {};
    props.maxMediaStyles[props.navbar?.breakpoint]['--app-shell-navbar-width'] = '100%';
    props.maxMediaStyles[props.navbar?.breakpoint]['--app-shell-navbar-offset'] = '0px';
  }

  if (isPrimitiveSize(navbarWidth)) {
    const baseSize = rem(getBaseSize(navbarWidth));
    props.baseStyles['--app-shell-navbar-width'] = baseSize;
    props.baseStyles['--app-shell-navbar-offset'] = baseSize;
  }

  if (isResponsiveSize(navbarWidth)) {
    if (typeof navbarWidth.base !== 'undefined') {
      props.baseStyles['--app-shell-navbar-width'] = rem(navbarWidth.base);
      props.baseStyles['--app-shell-navbar-offset'] = rem(navbarWidth.base);
    }

    keys(navbarWidth).forEach((key) => {
      if (key !== 'base') {
        props.minMediaStyles[key] = props.minMediaStyles[key] || {};
        props.minMediaStyles[key]['--app-shell-navbar-width'] = rem(navbarWidth![key]);
        props.minMediaStyles[key]['--app-shell-navbar-offset'] = rem(navbarWidth![key]);
      }
    });
  }

  if (props.navbar?.collapsed?.desktop) {
    const breakpointValue = props.navbar!.breakpoint;
    props.minMediaStyles[breakpointValue] = props.minMediaStyles[breakpointValue] || {};
    props.minMediaStyles[breakpointValue]['--app-shell-navbar-transform'] = collapsedNavbarTransform;
    props.minMediaStyles[breakpointValue]['--app-shell-navbar-transform-rtl'] =
      collapsedNavbarTransformRtl;
    props.minMediaStyles[breakpointValue]['--app-shell-navbar-offset'] = '0px !important';
  }

  if (props.navbar?.collapsed?.mobile) {
    const breakpointValue = getBreakpointValue(props.navbar!.breakpoint, props.theme.breakpoints) - 0.1;
    props.maxMediaStyles[breakpointValue] = props.maxMediaStyles[breakpointValue] || {};
    props.maxMediaStyles[breakpointValue]['--app-shell-navbar-width'] = '100%';
    props.maxMediaStyles[breakpointValue]['--app-shell-navbar-offset'] = '0px';
    props.maxMediaStyles[breakpointValue]['--app-shell-navbar-transform'] = collapsedNavbarTransform;
    props.maxMediaStyles[breakpointValue]['--app-shell-navbar-transform-rtl'] =
      collapsedNavbarTransformRtl;
  }
}
