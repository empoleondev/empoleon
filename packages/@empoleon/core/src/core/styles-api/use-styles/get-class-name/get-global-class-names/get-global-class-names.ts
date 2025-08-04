import cx from 'clsx';
import { EmpoleonTheme } from '../../../../EmpoleonProvider';
import { GetStylesApiOptions } from '../../../styles-api.types';

interface GetGlobalClassNamesOptions {
  theme: EmpoleonTheme;
  unstyled: boolean | undefined;
  options: GetStylesApiOptions | undefined;
}

export const FOCUS_CLASS_NAMES = {
  always: 'empoleon-focus-always',
  auto: 'empoleon-focus-auto',
  never: 'empoleon-focus-never',
} as const;

/** Returns classes that are defined globally (focus and active styles) based on options */
export function getGlobalClassNames(props: GetGlobalClassNamesOptions) {
  return cx(
    props.options?.focusable && !props.unstyled && (props.theme.focusClassName || FOCUS_CLASS_NAMES[props.theme.focusRing]),
    props.options?.active && !props.unstyled && props.theme.activeClassName
  );
}
