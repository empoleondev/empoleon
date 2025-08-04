// import { JSX, mergeProps, splitProps, createSignal, onMount, onCleanup, Show } from "solid-js";
// import { Portal as CreatePortal } from "solid-js/web";

// export interface PortalProps extends JSX.HTMLAttributes<HTMLDivElement> {
//   children: JSX.Element;
//   target?: HTMLElement | string;
//   reuseTargetNode?: boolean;
// }

// const defaultProps = { reuseTargetNode: true };
// type DivProps = JSX.HTMLAttributes<HTMLDivElement>;

// function createPortalNode(props: DivProps) {
//   const node = document.createElement("div");
//   node.setAttribute("data-portal", "true");
//   if (typeof props.class === "string") node.classList.add(...props.class.split(" ").filter(Boolean));
//   if (props.style && typeof props.style === "object") Object.assign(node.style, props.style);
//   if (typeof props.id === "string") node.setAttribute("id", props.id);
//   return node;
// }

// // Split off children so helpers don’t require it :contentReference[oaicite:1]{index=1}
// function getTargetNode(props: Omit<PortalProps, "children">) {
//   const { target, reuseTargetNode, class: cls, style, id } = props;
//   const divProps: DivProps = { class: cls, style, id };

//   if (target) {
//     if (typeof target === "string")
//       return document.querySelector<HTMLElement>(target) || createPortalNode(divProps);
//     return target;
//   }

//   if (reuseTargetNode) {
//     const shared = document.querySelector<HTMLElement>("[data-empoleon-shared-portal-node]");
//     if (shared) return shared;
//     const node = createPortalNode(divProps);
//     node.setAttribute("data-empoleon-shared-portal-node", "true");
//     document.body.appendChild(node);
//     return node;
//   }

//   return createPortalNode(divProps);
// }

// export function Portal(p: PortalProps): JSX.Element | null {
//   const props = mergeProps(defaultProps, p);
//   const [local, _] = splitProps(props, [
//     "children",
//     "target",
//     "reuseTargetNode",
//     "class",
//     "style",
//     "id"
//   ]);

//   const [mounted, setMounted] = createSignal(false);
//   const [node, setNode] = createSignal<HTMLElement>();

//   onMount(() => {
//     setMounted(true);
//     const n = getTargetNode({
//       target: local.target,
//       reuseTargetNode: local.reuseTargetNode,
//       class: local.class,
//       style: local.style,
//       id: local.id,
//     });
//     if (!local.target && !local.reuseTargetNode) document.body.appendChild(n);
//     setNode(n);
//   });

//   onCleanup(() => {
//     if (!local.target && !local.reuseTargetNode && node()) document.body.removeChild(node()!);
//   });

//   return (
//     <Show when={mounted() && node()} fallback={null}>
//       <CreatePortal mount={node()!}>{local.children}</CreatePortal>
//     </Show>
//   );
// }

// Portal.displayName = '@empoleon/core/Portal';

// import { JSX, mergeProps, splitProps, createSignal, onMount, onCleanup, Show } from "solid-js";
// import { Portal as CreatePortal } from "solid-js/web";

// const defaultProps = { reuseTargetNode: true };
// type DivProps = JSX.HTMLAttributes<HTMLDivElement>;

// function createPortalNode(props: DivProps) {
//   const node = document.createElement("div");
//   node.setAttribute("data-portal", "true");
//   if (typeof props.class === "string") node.classList.add(...props.class.split(" ").filter(Boolean));
//   if (props.style && typeof props.style === "object") Object.assign(node.style, props.style);
//   if (typeof props.id === "string") node.setAttribute("id", props.id);
//   return node;
// }

// export interface BasePortalProps extends JSX.HTMLAttributes<HTMLDivElement> {
//   /** Element inside which portal should be created, by default a new div element is created and appended to the `document.body` */
//   target?: HTMLElement | string;

//   /** If set, all portals are rendered in the same DOM node @default `true` */
//   reuseTargetNode?: boolean;
// }

// export interface PortalProps extends BasePortalProps {
//   /** Portal children, for example, custom modal or popover */
//   children: JSX.Element;
// }

// // Split off children so helpers don't require it
// function getTargetNode(props: Omit<PortalProps, "children">) {
//   const { target, reuseTargetNode, class: cls, style, id } = props;
//   const divProps: DivProps = { class: cls, style, id };

//   if (target) {
//     if (typeof target === "string") {
//       const found = document.querySelector<HTMLElement>(target);
//       if (found) return found;
//       // Only create a portal node if target string not found
//       return createPortalNode(divProps);
//     }
//     // When explicit HTMLElement target is provided, use it directly
//     // Don't apply styling props to the provided target
//     return target;
//   }

//   if (reuseTargetNode) {
//     const shared = document.querySelector<HTMLElement>("[data-empoleon-shared-portal-node]");
//     if (shared) return shared;
//     const node = createPortalNode(divProps);
//     node.setAttribute("data-empoleon-shared-portal-node", "true");
//     document.body.appendChild(node);
//     return node;
//   }

//   return createPortalNode(divProps);
// }

// function PortalComponent(p: PortalProps): JSX.Element | null {
//   const props = mergeProps(defaultProps, p);
//   const [local, others] = splitProps(props, [
//     "children",
//     "target",
//     "reuseTargetNode",
//     "class",
//     "style",
//     "id"
//   ]);

//   const [mounted, setMounted] = createSignal(false);
//   const [node, setNode] = createSignal<HTMLElement>();

//   onMount(() => {
//     setMounted(true);
//     const n = getTargetNode({
//       target: local.target,
//       reuseTargetNode: local.reuseTargetNode,
//       class: local.class,
//       style: local.style,
//       id: local.id,
//     });
//     if (!local.target && !local.reuseTargetNode) document.body.appendChild(n);
//     setNode(n);

//     // Set ref if provided
//     const ref = (others as any).ref;
//     if (typeof ref === 'function') {
//       ref(n as HTMLDivElement);
//     } else if (ref && typeof ref === 'object' && 'current' in ref) {
//       ref.current = n as HTMLDivElement;
//     }
//   });

//   onCleanup(() => {
//     if (!local.target && !local.reuseTargetNode && node()) document.body.removeChild(node()!);
//   });

//   return (
//     <Show when={mounted() && node()} fallback={null}>
//       <CreatePortal mount={node()!}>{local.children}</CreatePortal>
//     </Show>
//   );
// }

// export const Portal = PortalComponent;

// // Add static extend function
// PortalComponent.extend = function(props: Partial<PortalProps>) {
//   return function(p: PortalProps) {
//     return PortalComponent({ ...props, ...p });
//   };
// };

// PortalComponent.displayName = '@empoleon/core/Portal';


// import { JSX, splitProps, createSignal, onMount, onCleanup } from "solid-js";
// import { Portal as CreatePortal } from "solid-js/web";
// import { factory } from "../../core";

// function createPortalNode(props: JSX.HTMLAttributes<HTMLDivElement>) {
//   const node = document.createElement('div');
//   node.setAttribute('data-portal', 'true');

//   if (typeof props.class === 'string') {
//     node.classList.add(...props.class.split(' ').filter(Boolean));
//   }

//   if (props.style && typeof props.style === 'object') {
//     Object.assign(node.style, props.style);
//   }

//   if (typeof props.id === 'string') {
//     node.setAttribute('id', props.id);
//   }

//   return node;
// }

// export interface BasePortalProps extends JSX.HTMLAttributes<HTMLDivElement> {
//   /** Element inside which portal should be created, by default a new div element is created and appended to the `document.body` */
//   target?: HTMLElement | string;

//   /** If set, all portals are rendered in the same DOM node @default `true` */
//   reuseTargetNode?: boolean;
// }

// export interface PortalProps extends BasePortalProps {
//   /** Portal children, for example, custom modal or popover */
//   children: JSX.Element;
// }

// function getTargetNode(props: Omit<PortalProps, 'children'>): HTMLElement {
//   const { target, reuseTargetNode, ...others } = props;

//   if (target) {
//     if (typeof target === 'string') {
//       return document.querySelector<HTMLElement>(target) || createPortalNode(others);
//     }
//     return target;
//   }

//   if (reuseTargetNode) {
//     const existingNode = document.querySelector<HTMLElement>('[data-empoleon-shared-portal-node]');

//     if (existingNode) {
//       return existingNode;
//     }

//     const node = createPortalNode(others);
//     node.setAttribute('data-empoleon-shared-portal-node', 'true');
//     document.body.appendChild(node);
//     return node;
//   }

//   return createPortalNode(others);
// }

// // Factory type for consistency with React version pattern
// export type PortalFactory = {
//   props: PortalProps;
//   ref: HTMLDivElement;
// };

// const defaultProps: Partial<PortalProps> = {
//   reuseTargetNode: true,
// };

// export const Portal = factory<PortalFactory>(props => {
//   const [local, others] = splitProps(props, [
//     'children',
//     'target',
//     'reuseTargetNode',
//     'ref'
//   ]);

//   const [mounted, setMounted] = createSignal(false);
//   const [node, setNode] = createSignal<HTMLElement | null>(null);

//   onMount(() => {
//     setMounted(true);
//     const targetNode = getTargetNode({
//       target: local.target,
//       reuseTargetNode: local.reuseTargetNode,
//       ...others
//     });

//     setNode(targetNode);

//     if (local.ref) {
//       local.ref(targetNode as HTMLDivElement);
//     }

//     if (!local.target && !local.reuseTargetNode && targetNode) {
//       document.body.appendChild(targetNode);
//     }
//   });

//   onCleanup(() => {
//     const currentNode = node();
//     if (!local.target && !local.reuseTargetNode && currentNode) {
//       document.body.removeChild(currentNode);
//     }
//   });

//   if (!mounted() || !node()) {
//     return null;
//   }

//   return <CreatePortal mount={node()!}>{local.children}</CreatePortal>;
// });

// Portal.displayName = '@empoleon/core/Portal';

import { JSX, splitProps, createSignal, onMount, onCleanup, Show } from "solid-js";
import { Portal as CreatePortal } from "solid-js/web";
import { factory } from "../../core";

function createPortalNode(props: JSX.HTMLAttributes<HTMLDivElement>) {
  const node = document.createElement('div');
  node.setAttribute('data-portal', 'true');

  if (typeof props.class === 'string') {
    node.classList.add(...props.class.split(' ').filter(Boolean));
  }

  if (props.style && typeof props.style === 'object') {
    Object.assign(node.style, props.style);
  }

  if (typeof props.id === 'string') {
    node.setAttribute('id', props.id);
  }

  return node;
}

export interface BasePortalProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Element inside which portal should be created, by default a new div element is created and appended to the `document.body` */
  target?: HTMLElement | string;

  /** If set, all portals are rendered in the same DOM node @default `true` */
  reuseTargetNode?: boolean;
}

export interface PortalProps extends BasePortalProps {
  /** Portal children, for example, custom modal or popover */
  children: JSX.Element;
}

function getTargetNode(props: Omit<PortalProps, 'children'>): HTMLElement {
  const { target, reuseTargetNode, ...others } = props;

  if (target) {
    if (typeof target === 'string') {
      const found = document.querySelector<HTMLElement>(target);
      return found || createPortalNode(others);
    }
    return target;
  }

  if (reuseTargetNode) {
    const existingNode = document.querySelector<HTMLElement>('[data-empoleon-shared-portal-node]');

    if (existingNode) {
      return existingNode;
    }

    const node = createPortalNode(others);
    node.setAttribute('data-empoleon-shared-portal-node', 'true');
    document.body.appendChild(node);
    return node;
  }

  return createPortalNode(others);
}

// Factory type for consistency with React version pattern
export type PortalFactory = {
  props: PortalProps;
  ref: HTMLDivElement;
};

const defaultProps: Partial<PortalProps> = {
  reuseTargetNode: true,
};

export const Portal = factory<PortalFactory>(props => {
  const [local, others] = splitProps(props, [
    'children',
    'target',
    'reuseTargetNode',
    'ref'
  ]);

  const [mounted, setMounted] = createSignal(false);
  const [node, setNode] = createSignal<HTMLElement | null>(null);

  onMount(() => {
    const targetNode = getTargetNode({
      target: local.target,
      reuseTargetNode: local.reuseTargetNode ?? defaultProps.reuseTargetNode,
      ...others
    });

    setNode(targetNode);

    if (local.ref) {
      local.ref(targetNode as HTMLDivElement);
    }

    // Only append to body if we created a new individual node (not shared and not explicit target)
    if (!local.target && !(local.reuseTargetNode ?? defaultProps.reuseTargetNode) && targetNode) {
      document.body.appendChild(targetNode);
    }

    setMounted(true);
  });

  onCleanup(() => {
    const currentNode = node();
    // Only remove from body if we created an individual node (not shared and not explicit target)
    if (!local.target && !(local.reuseTargetNode ?? defaultProps.reuseTargetNode) && currentNode) {
      document.body.removeChild(currentNode);
    }
  });

  return (
    <Show when={mounted() && node()} fallback={null}>
      <CreatePortal mount={node()!}>{local.children}</CreatePortal>
    </Show>
  );
});

Portal.displayName = '@empoleon/core/Portal';
