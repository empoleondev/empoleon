import { JSX, splitProps } from 'solid-js';
import { createEventHandler, isElement, useProps } from '../../../core';
import { Popover, PopoverTargetProps } from '../../Popover';
import { useHoverCardContext } from '../HoverCard.context';
import { useHoverCardGroupContext } from '../HoverCardGroup/HoverCardGroup.context';

export interface HoverCardTargetProps extends Omit<PopoverTargetProps, 'children'> {
  children: JSX.Element;
  eventPropsWrapperName?: string;
}

const defaultProps = {
  refProp: 'ref',
} satisfies Partial<HoverCardTargetProps>;

export function HoverCardTarget(_props: HoverCardTargetProps) {
  const props = useProps('HoverCardTarget', defaultProps, _props);

  const [local, others] = splitProps(props, ['children', 'refProp', 'eventPropsWrapperName']);

  if (!isElement(local.children)) {
    throw new Error(
      'HoverCard.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
    );
  }

  const ctx = useHoverCardContext();
  const withinGroup = useHoverCardGroupContext();

  if (withinGroup && ctx.getReferenceProps && ctx.reference) {
    const referenceProps = ctx.getReferenceProps();

    return (
      <Popover.Target {...others}>
        {(targetProps) => {
          const combinedRef = (el: HTMLElement | null) => {
            if (ctx.reference) {
              ctx.reference(el);
            }
          };

          const mergedProps = {
            ...targetProps,
            ...referenceProps,
            ref: combinedRef,
          };

          return <span {...mergedProps}>{local.children}</span>;
        }}
      </Popover.Target>
    );
  }

  const onMouseEnter = createEventHandler(undefined, ctx.openDropdown);
  const onMouseLeave = createEventHandler(undefined, ctx.closeDropdown);

  const eventListeners = { onMouseEnter, onMouseLeave };

  return (
    <Popover.Target {...others}>
      {(targetProps) => {
        const wrapperProps = local.eventPropsWrapperName
          ? { [local.eventPropsWrapperName]: eventListeners }
          : eventListeners;

        return (
          <span
            {...wrapperProps}
            {...targetProps}
            onMouseEnter={(e) => {
              const handler = local.eventPropsWrapperName
                ? (wrapperProps as any)[local.eventPropsWrapperName]?.onMouseEnter
                : (wrapperProps as any).onMouseEnter;
              handler?.(e);
            }}
            onMouseLeave={(e) => {
              const handler = local.eventPropsWrapperName
                ? (wrapperProps as any)[local.eventPropsWrapperName]?.onMouseLeave
                : (wrapperProps as any).onMouseLeave;
              handler?.(e);
            }}
          >
            {local.children}
          </span>
        );
      }}
    </Popover.Target>
  );
}

HoverCardTarget.displayName = '@empoleon/core/HoverCardTarget';
