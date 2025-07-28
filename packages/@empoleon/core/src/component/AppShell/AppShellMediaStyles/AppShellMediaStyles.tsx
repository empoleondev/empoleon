import { createMemo } from 'solid-js';
import { InlineStyles, useEmpoleonContext, useEmpoleonTheme } from '../../../core';
import type { AppShellProps } from '../AppShell';
import { getVariables } from './get-variables/get-variables';

interface AppShellMediaStylesProps {
  navbar: () => AppShellProps['navbar'] | undefined;
  header: () => AppShellProps['header'] | undefined;
  aside: () => AppShellProps['aside'] | undefined;
  footer: () => AppShellProps['footer'] | undefined;
  padding: () => AppShellProps['padding'] | undefined;
}

export function AppShellMediaStyles(props: AppShellMediaStylesProps) {
  const theme = useEmpoleonTheme();
  const ctx = useEmpoleonContext();
  const variables = createMemo(() =>
    getVariables({
      navbar: props.navbar(),
      header: props.header(),
      footer: props.footer(),
      aside: props.aside(),
      padding: props.padding(),
      theme
    })
  );

  return <InlineStyles media={variables().media} styles={variables().baseStyles} selector={ctx.cssVariablesSelector} />;
}
