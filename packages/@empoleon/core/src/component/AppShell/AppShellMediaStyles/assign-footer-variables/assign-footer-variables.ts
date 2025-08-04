import { keys, rem } from '../../../../core';
import type { AppShellProps } from '../../AppShell';
import { getBaseSize } from '../get-base-size/get-base-size';
import type { CSSVariables, MediaQueryVariables } from '../get-variables/get-variables';
import { isPrimitiveSize } from '../is-primitive-size/is-primitive-size';
import { isResponsiveSize } from '../is-responsive-size/is-responsive-size';

interface AssignFooterVariablesInput {
  baseStyles: CSSVariables;
  minMediaStyles: MediaQueryVariables;
  footer: AppShellProps['footer'] | undefined;
}

export function assignFooterVariables(props: AssignFooterVariablesInput) {
  const footerHeight = props.footer?.height;
  const collapsedFooterTransform = 'translateY(var(--app-shell-footer-height))';
  const shouldOffset = props.footer?.offset ?? true;

  if (isPrimitiveSize(footerHeight)) {
    const baseSize = rem(getBaseSize(footerHeight));
    props.baseStyles['--app-shell-footer-height'] = baseSize;
    if (shouldOffset) {
      props.baseStyles['--app-shell-footer-offset'] = baseSize;
    }
  }

  if (isResponsiveSize(footerHeight)) {
    if (typeof footerHeight.base !== 'undefined') {
      props.baseStyles['--app-shell-footer-height'] = rem(footerHeight.base);

      if (shouldOffset) {
        props.baseStyles['--app-shell-footer-offset'] = rem(footerHeight.base);
      }
    }

    keys(footerHeight).forEach((key) => {
      if (key !== 'base') {
        props.minMediaStyles[key] = props.minMediaStyles[key] || {};
        props.minMediaStyles[key]['--app-shell-footer-height'] = rem(footerHeight[key]);

        if (shouldOffset) {
          props.minMediaStyles[key]['--app-shell-footer-offset'] = rem(footerHeight[key]);
        }
      }
    });
  }

  if (props.footer?.collapsed) {
    props.baseStyles['--app-shell-footer-transform'] = collapsedFooterTransform;
    props.baseStyles['--app-shell-footer-offset'] = '0px !important';
  }
}
