import { Component, splitProps } from 'solid-js';
import { BoxProps, createPolymorphicComponent, useProps } from '../../../core';
import { usePaginationContext } from '../Pagination.context';
import {
  PaginationFirstIcon,
  PaginationIconProps,
  PaginationLastIcon,
  PaginationNextIcon,
  PaginationPreviousIcon,
} from '../Pagination.icons';
import { PaginationControl } from '../PaginationControl/PaginationControl';

export interface CreateEdgeComponent {
  icon: Component<PaginationIconProps>;
  name: string;
  action: 'onNext' | 'onPrevious' | 'onFirst' | 'onLast';
  type: 'next' | 'previous';
}

export interface PaginationEdgeProps extends BoxProps {
  /** An icon component to replace the default icon */
  icon?: Component<PaginationIconProps>;
  ref?: HTMLButtonElement;
}

export function createEdgeComponent(edgeProps: CreateEdgeComponent) {
  const defaultProps: Partial<PaginationEdgeProps> = { icon: edgeProps.icon };

  const Component = (_props: PaginationEdgeProps) => {
    const props = useProps(edgeProps.name, defaultProps, _props);
    const [local, others] = splitProps(props, [
      'icon',
      'ref'
    ]);
    const Icon = local.icon!;
    const ctx = usePaginationContext();
    const disabled = () => edgeProps.type === 'next' ? ctx.active() === ctx.total() : ctx.active() === 1;

    return (
      <PaginationControl
        disabled={ctx.disabled() || disabled()}
        ref={local.ref}
        onClick={ctx[edgeProps.action]}
        withPadding={false}
        {...others}
      >
        <Icon
          class="empoleon-rotate-rtl"
          style={{
            width: 'calc(var(--pagination-control-size) / 1.8)',
            height: 'calc(var(--pagination-control-size) / 1.8)',
          }}
        />
      </PaginationControl>
    );
  };

  Component.displayName = `@empoleon/core/${edgeProps.name}`;
  return createPolymorphicComponent<'button', PaginationEdgeProps>(Component);
}

export const PaginationNext = createEdgeComponent({
  icon: PaginationNextIcon,
  name: 'PaginationNext',
  action: 'onNext',
  type: 'next',
});

export const PaginationPrevious = createEdgeComponent({
  icon: PaginationPreviousIcon,
  name: 'PaginationPrevious',
  action: 'onPrevious',
  type: 'previous',
});

export const PaginationFirst = createEdgeComponent({
  icon: PaginationFirstIcon,
  name: 'PaginationFirst',
  action: 'onFirst',
  type: 'previous',
});

export const PaginationLast = createEdgeComponent({
  icon: PaginationLastIcon,
  name: 'PaginationLast',
  action: 'onLast',
  type: 'next',
});
