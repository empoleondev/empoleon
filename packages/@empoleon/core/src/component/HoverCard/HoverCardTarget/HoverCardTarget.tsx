import { JSX, splitProps, children as getChildren } from 'solid-js';
import { createEventHandler, useProps } from '../../../core';
import { Popover, PopoverTargetProps } from '../../Popover';
import { useHoverCardContext } from '../HoverCard.context';
import { useHoverCardGroupContext } from '../HoverCardGroup/HoverCardGroup.context';

export interface HoverCardTargetProps extends Omit<PopoverTargetProps, 'children'> {
  children: JSX.Element;
  eventPropsWrapperName?: string;
}

const defaultProps: Partial<HoverCardTargetProps> = {
  refProp: 'ref',
};

export function HoverCardTarget(_props: HoverCardTargetProps) {
  const props = useProps('HoverCardTarget', defaultProps, _props);

  const [local, others] = splitProps(props, [
    'children',
    'refProp',
    'eventPropsWrapperName',
  ]);

  const safe = getChildren(() => local.children);
  const resolved = safe();

  let child;
  if (Array.isArray(resolved)) {
    child = resolved.find(item => item != null && typeof item === 'object');
  } else {
    child = resolved;
  }

  const ctx = useHoverCardContext();
  const withinGroup = useHoverCardGroupContext();

  if (withinGroup && ctx.getReferenceProps && ctx.reference) {
    const referenceProps = ctx.getReferenceProps();

    return (
      <Popover.Target {...others}>
        {(targetProps) => {
          const wrapperProps = local.eventPropsWrapperName
            ? { [local.eventPropsWrapperName]: { ...referenceProps, ref: ctx.reference } }
            : { ...referenceProps, ref: ctx.reference };

          return (
            <span
              {...wrapperProps}
              {...targetProps}
            >
              {local.children}
            </span>
          );
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
