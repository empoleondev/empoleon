import { Show, splitProps } from 'solid-js';
import { factory, Factory, useEmpoleonEnv } from '../../core';
import { Portal, PortalProps } from './Portal';

export interface OptionalPortalProps extends PortalProps {
  withinPortal?: boolean;
}

export type OptionalPortalFactory = Factory<{
  props: OptionalPortalProps;
  ref: HTMLDivElement;
}>;

export const OptionalPortal = factory<OptionalPortalFactory>((_props) => {
  const [local, others] = splitProps(_props, ['children', 'withinPortal', 'ref']);
  const env = useEmpoleonEnv();
  const shouldUsePortal = () => local.withinPortal !== false && env !== 'test';

  return (
    <Show when={shouldUsePortal()} fallback={<>{local.children}</>}>
      <Portal ref={local.ref} {...others}>
        {local.children}
      </Portal>
    </Show>
  );
});

OptionalPortal.displayName = '@empoleon/core/OptionalPortal';
