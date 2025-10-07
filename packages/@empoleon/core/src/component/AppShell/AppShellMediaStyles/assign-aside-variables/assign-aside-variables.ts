import { EmpoleonTheme, getBreakpointValue, keys, rem } from '../../../../core';
import type { AppShellProps } from '../../AppShell';
import { getBaseSize } from '../get-base-size/get-base-size';
import type { CSSVariables, MediaQueryVariables } from '../get-variables/get-variables';
import { isPrimitiveSize } from '../is-primitive-size/is-primitive-size';
import { isResponsiveSize } from '../is-responsive-size/is-responsive-size';

interface AssignAsideVariablesInput {
  baseStyles: CSSVariables;
  minMediaStyles: MediaQueryVariables;
  maxMediaStyles: MediaQueryVariables;
  aside: AppShellProps['aside'] | undefined;
  theme: EmpoleonTheme;
}

export function assignAsideVariables(props: AssignAsideVariablesInput) {
  const asideWidth = props.aside?.width;
  const collapsedAsideTransform = 'translateX(var(--app-shell-aside-width))';
  const collapsedAsideTransformRtl = 'translateX(calc(var(--app-shell-aside-width) * -1))';

  if (props.aside?.breakpoint && !props.aside?.collapsed?.mobile) {
    props.maxMediaStyles[props.aside?.breakpoint] =
      props.maxMediaStyles[props.aside?.breakpoint] || {};
    props.maxMediaStyles[props.aside?.breakpoint]['--app-shell-aside-width'] = '100%';
    props.maxMediaStyles[props.aside?.breakpoint]['--app-shell-aside-offset'] = '0px';
  }

  if (isPrimitiveSize(asideWidth)) {
    const baseSize = rem(getBaseSize(asideWidth));
    props.baseStyles['--app-shell-aside-width'] = baseSize;
    props.baseStyles['--app-shell-aside-offset'] = baseSize;
  }

  if (isResponsiveSize(asideWidth)) {
    if (typeof asideWidth.base !== 'undefined') {
      props.baseStyles['--app-shell-aside-width'] = rem(asideWidth.base);
      props.baseStyles['--app-shell-aside-offset'] = rem(asideWidth.base);
    }

    keys(asideWidth).forEach((key) => {
      if (key !== 'base') {
        props.minMediaStyles[key] = props.minMediaStyles[key] || {};
        props.minMediaStyles[key]['--app-shell-aside-width'] = rem(asideWidth![key]);
        props.minMediaStyles[key]['--app-shell-aside-offset'] = rem(asideWidth![key]);
      }
    });
  }

  if (props.aside?.collapsed?.desktop) {
    const breakpointValue = props.aside!.breakpoint;
    props.minMediaStyles[breakpointValue] = props.minMediaStyles[breakpointValue] || {};
    props.minMediaStyles[breakpointValue]['--app-shell-aside-transform'] = collapsedAsideTransform;
    props.minMediaStyles[breakpointValue]['--app-shell-aside-transform-rtl'] =
      collapsedAsideTransformRtl;
    props.minMediaStyles[breakpointValue]['--app-shell-aside-offset'] = '0px !important';
  }

  if (props.aside?.collapsed?.mobile) {
    const breakpointValue =
      getBreakpointValue(props.aside!.breakpoint, props.theme.breakpoints) - 0.1;
    props.maxMediaStyles[breakpointValue] = props.maxMediaStyles[breakpointValue] || {};
    props.maxMediaStyles[breakpointValue]['--app-shell-aside-width'] = '100%';
    props.maxMediaStyles[breakpointValue]['--app-shell-aside-offset'] = '0px';
    props.maxMediaStyles[breakpointValue]['--app-shell-aside-transform'] = collapsedAsideTransform;
    props.maxMediaStyles[breakpointValue]['--app-shell-aside-transform-rtl'] =
      collapsedAsideTransformRtl;
  }
}
