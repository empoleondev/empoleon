import { splitProps } from "solid-js";
import { Portal, PortalProps } from "./Portal";
import { factory, Factory, useEmpoleonEnv } from "../../core";

export interface OptionalPortalProps extends PortalProps {
  withinPortal?: boolean;
}

export type OptionalPortalFactory = Factory<{
  props: OptionalPortalProps;
  ref: HTMLDivElement;
}>;

export const OptionalPortal = factory<OptionalPortalFactory>(_props => {
  const [local, others] = splitProps(_props, ["children", "withinPortal", "ref"]);
  const env = useEmpoleonEnv();
  const shouldUsePortal = local.withinPortal !== false && env !== 'test';

  if (!shouldUsePortal) {
    return <>{local.children}</>;
  }

  return (
    <Portal ref={local.ref} {...others}>
      {local.children}
    </Portal>
  );
});

OptionalPortal.displayName = '@empoleon/core/OptionalPortal';
