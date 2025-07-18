import { InlineStyles, useEmpoleonContext, useEmpoleonTheme } from '../../../core';
import type { AppShellProps } from '../AppShell';
import { getVariables } from './get-variables/get-variables';

interface AppShellMediaStylesProps {
  navbar: AppShellProps['navbar'] | undefined;
  header: AppShellProps['header'] | undefined;
  aside: AppShellProps['aside'] | undefined;
  footer: AppShellProps['footer'] | undefined;
  padding: AppShellProps['padding'] | undefined;
}

export function AppShellMediaStyles({
  navbar,
  header,
  aside,
  footer,
  padding,
}: AppShellMediaStylesProps) {
  const theme = useEmpoleonTheme();
  const ctx = useEmpoleonContext();
  const { media, baseStyles } = getVariables({ navbar, header, footer, aside, padding, theme });
  return <InlineStyles media={media} styles={baseStyles} selector={ctx.cssVariablesSelector} />;
}
