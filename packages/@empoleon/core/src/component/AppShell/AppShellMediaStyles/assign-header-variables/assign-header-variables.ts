import { keys, rem } from '../../../../core';
import type { AppShellProps } from '../../AppShell';
import { getBaseSize } from '../get-base-size/get-base-size';
import type { CSSVariables, MediaQueryVariables } from '../get-variables/get-variables';
import { isPrimitiveSize } from '../is-primitive-size/is-primitive-size';
import { isResponsiveSize } from '../is-responsive-size/is-responsive-size';

interface AssignHeaderVariablesInput {
  baseStyles: CSSVariables;
  minMediaStyles: MediaQueryVariables;
  header: AppShellProps['header'] | undefined;
}

export function assignHeaderVariables(props: AssignHeaderVariablesInput) {
  const headerHeight = props.header?.height;
  const collapsedHeaderTransform = 'translateY(calc(var(--app-shell-header-height) * -1))';
  const shouldOffset = props.header?.offset ?? true;

  if (isPrimitiveSize(headerHeight)) {
    const baseSize = rem(getBaseSize(headerHeight));
    props.baseStyles['--app-shell-header-height'] = baseSize;
    if (shouldOffset) {
      props.baseStyles['--app-shell-header-offset'] = baseSize;
    }
  }

  if (isResponsiveSize(headerHeight)) {
    if (typeof headerHeight.base !== 'undefined') {
      props.baseStyles['--app-shell-header-height'] = rem(headerHeight.base);

      if (shouldOffset) {
        props.baseStyles['--app-shell-header-offset'] = rem(headerHeight.base);
      }
    }

    keys(headerHeight).forEach((key) => {
      if (key !== 'base') {
        props.minMediaStyles[key] = props.minMediaStyles[key] || {};
        props.minMediaStyles[key]['--app-shell-header-height'] = rem(headerHeight[key]);

        if (shouldOffset) {
          props.minMediaStyles[key]['--app-shell-header-offset'] = rem(headerHeight[key]);
        }
      }
    });
  }

  if (props.header?.collapsed) {
    props.baseStyles['--app-shell-header-transform'] = collapsedHeaderTransform;
    props.baseStyles['--app-shell-header-offset'] = '0px !important';
  }
}
