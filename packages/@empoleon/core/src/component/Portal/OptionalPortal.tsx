import { JSX, splitProps, Show } from "solid-js";
import { Portal, PortalProps } from "./Portal";
import { useEmpoleonEnv } from "../../core";

export interface OptionalPortalProps extends PortalProps {
  withinPortal?: boolean;
}

export function OptionalPortal(p: OptionalPortalProps): JSX.Element {
  const [local, others] = splitProps(p, ["withinPortal", "children"]);
  const env = useEmpoleonEnv();

  return (
    <Show
      when={env !== "test" && local.withinPortal !== false}
      fallback={local.children}
    >
      <Portal {...others}>{local.children}</Portal>
    </Show>
  );
}
