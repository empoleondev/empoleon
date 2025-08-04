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

  if (env === 'test' || !local.withinPortal) {
      return <>{local.children}</>;
    }

  return (
      <Portal ref={local.ref} {...others}>
        {local.children}
      </Portal>
    );
});

OptionalPortal.displayName = '@empoleon/core/OptionalPortal';

// export const OptionalPortal = factory<OptionalPortalFactory>(_props => {
//   const [local, portalProps] = splitProps(_props, ["withinPortal"]);
//   const env = useEmpoleonEnv();

//   // In test environment: only use portal if withinPortal is explicitly true
//   // In non-test environment: use portal unless withinPortal is explicitly false
//   const shouldPortal = env === "test"
//     ? local.withinPortal === true
//     : local.withinPortal !== false;

//   if (shouldPortal) {
//     // Only pass essential props to Portal to avoid wrapper div creation
//     const { children, target, reuseTargetNode } = portalProps;
//     return <Portal target={target} reuseTargetNode={reuseTargetNode}>{children}</Portal>;
//   } else {
//     return <>{portalProps.children}</>;
//   }
// })

// // Add static extend function to match the expected pattern
// (OptionalPortal as any).extend = function(props: Partial<OptionalPortalProps>) {
//   return function(p: OptionalPortalProps) {
//     return OptionalPortal({ ...props, ...p });
//   };
// };
