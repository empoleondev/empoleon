import { keys } from '../../../../core';
import type { AppShellProps } from '../../AppShell';
import { getBaseSize } from '../get-base-size/get-base-size';
import { getPaddingValue } from '../get-padding-value/get-padding-value';
import type { CSSVariables, MediaQueryVariables } from '../get-variables/get-variables';
import { isPrimitiveSize } from '../is-primitive-size/is-primitive-size';
import { isResponsiveSize } from '../is-responsive-size/is-responsive-size';

interface AssignPaddingVariablesInput {
  baseStyles: CSSVariables;
  minMediaStyles: MediaQueryVariables;
  padding: AppShellProps['padding'] | undefined;
}

export function assignPaddingVariables(props: AssignPaddingVariablesInput) {
  if (isPrimitiveSize(props.padding)) {
    props.baseStyles['--app-shell-padding'] = getPaddingValue(getBaseSize(props.padding));
  }

  if (isResponsiveSize(props.padding)) {
    const responsivePadding = props.padding;

    if (responsivePadding.base) {
      props.baseStyles['--app-shell-padding'] = getPaddingValue(responsivePadding.base);
    }

    keys(responsivePadding).forEach((key) => {
      if (key !== 'base') {
        props.minMediaStyles[key] = props.minMediaStyles[key] || {};
        props.minMediaStyles[key]['--app-shell-padding'] = getPaddingValue(responsivePadding![key]);
      }
    });
  }
}
