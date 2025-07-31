// import { JSX, splitProps, Show } from "solid-js";
// import { Portal, PortalProps } from "./Portal";
// import { useEmpoleonEnv } from "../../core";

// export interface OptionalPortalProps extends PortalProps {
//   withinPortal?: boolean;
// }

// export function OptionalPortal(p: OptionalPortalProps): JSX.Element {
//   const [local, others] = splitProps(p, ["withinPortal", "children"]);
//   const env = useEmpoleonEnv();

//   return (
//     <Show
//       when={env !== "test" && local.withinPortal !== false}
//       fallback={local.children}
//     >
//       <Portal {...others}>{local.children}</Portal>
//     </Show>
//   );
// }

import { JSX, splitProps, Show } from "solid-js";
import { Portal, PortalProps } from "./Portal";
import { useEmpoleonEnv } from "../../core";

export interface OptionalPortalProps extends PortalProps {
  withinPortal?: boolean;
}

export function OptionalPortal(p: OptionalPortalProps): JSX.Element {
  const [local, portalProps] = splitProps(p, ["withinPortal"]);
  const env = useEmpoleonEnv();

  // In test environment: only use portal if withinPortal is explicitly true
  // In non-test environment: use portal unless withinPortal is explicitly false
  const shouldPortal = env === "test"
    ? local.withinPortal === true
    : local.withinPortal !== false;

  if (shouldPortal) {
    // Only pass essential props to Portal to avoid wrapper div creation
    const { children, target, reuseTargetNode } = portalProps;
    return <Portal target={target} reuseTargetNode={reuseTargetNode}>{children}</Portal>;
  } else {
    return <>{portalProps.children}</>;
  }
}

// Add static extend function to match the expected pattern
(OptionalPortal as any).extend = function(props: Partial<OptionalPortalProps>) {
  return function(p: OptionalPortalProps) {
    return OptionalPortal({ ...props, ...p });
  };
};
