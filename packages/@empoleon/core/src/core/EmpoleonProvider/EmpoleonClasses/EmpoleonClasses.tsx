import { em, keys, px } from '../../utils';
import { useEmpoleonStyleNonce } from '../Empoleon.context';
import { useEmpoleonTheme } from '../EmpoleonThemeProvider';

export function EmpoleonClasses() {
  const theme = useEmpoleonTheme();
  const nonce = useEmpoleonStyleNonce();

  const classes = keys(theme.breakpoints).reduce<string>((acc, breakpoint) => {
    const isPxBreakpoint = theme.breakpoints[breakpoint].includes('px');
    const pxValue = px(theme.breakpoints[breakpoint]) as number;
    const maxWidthBreakpoint = isPxBreakpoint ? `${pxValue - 0.1}px` : em(pxValue - 0.1);
    const minWidthBreakpoint = isPxBreakpoint ? `${pxValue}px` : em(pxValue);

    return `${acc}@media (max-width: ${maxWidthBreakpoint}) {.empoleon-visible-from-${breakpoint} {display: none !important;}}@media (min-width: ${minWidthBreakpoint}) {.empoleon-hidden-from-${breakpoint} {display: none !important;}}`;
  }, '');

  return (
    <style
      data-empoleon-styles="classes"
      nonce={nonce?.()}
      // @ts-ignore
      innerHTML={classes}
    />
  );
}
