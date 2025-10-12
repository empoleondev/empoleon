import { createSignal, JSX, onCleanup, onMount, splitProps } from 'solid-js';
import { Portal as CreatePortal } from 'solid-js/web';
import { factory } from '../../core';

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
  const [local, others] = splitProps(props, ['target', 'reuseTargetNode']);

  if (local.target) {
    if (typeof local.target === 'string') {
      const found = document.querySelector<HTMLElement>(local.target);
      return found || createPortalNode(others);
    }
    return local.target;
  }

  if (local.reuseTargetNode !== false) {
    const existingNode = document.querySelector<HTMLElement>('[data-empoleon-shared-portal-node]');

    if (existingNode) {
      return existingNode;
    }

    const node = createPortalNode(others);
    node.setAttribute('data-empoleon-shared-portal-node', 'true');
    document.body.appendChild(node);
    return node;
  }

  const node = createPortalNode(others);
  document.body.appendChild(node);
  return node;
}

export type PortalFactory = {
  props: PortalProps;
  ref: HTMLDivElement;
};

const defaultProps: Partial<PortalProps> = {
  reuseTargetNode: true,
};

export const Portal = factory<PortalFactory>((props) => {
  const [local, others] = splitProps(props, ['children', 'target', 'reuseTargetNode', 'ref']);

  const [node, setNode] = createSignal<HTMLElement | null>(null);

  onMount(() => {
    const targetNode = getTargetNode({
      target: local.target,
      reuseTargetNode: local.reuseTargetNode ?? defaultProps.reuseTargetNode,
      ...others,
    });

    setNode(targetNode);

    if (local.ref) {
      local.ref(targetNode as HTMLDivElement);
    }
  });

  onCleanup(() => {
    const currentNode = node();
    // Only remove individual nodes (not shared ones or explicit targets)
    if (
      currentNode &&
      !local.target &&
      !(local.reuseTargetNode ?? defaultProps.reuseTargetNode) &&
      currentNode.parentNode === document.body
    ) {
      document.body.removeChild(currentNode);
    }
  });

  return <CreatePortal mount={node() || document.body}>{local.children}</CreatePortal>;
});

Portal.displayName = '@empoleon/core/Portal';
