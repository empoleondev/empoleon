import { JSX, splitProps, children as getChildren } from 'solid-js';
import { createEventHandler, useProps } from '../../../core';
import { Popover, PopoverTargetProps } from '../../Popover';
import { useHoverCardContext } from '../HoverCard.context';

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

  // if (!isElement(props.children)) {
  //   throw new Error(
  //     'HoverCard.Target children must be a single element or component that accepts a ref'
  //   );
  // }

  const safe = getChildren(() => local.children);
  const resolved = safe();

  // If more than one top‑level node, or primitive, reject
  if (!resolved || Array.isArray(resolved) || typeof resolved === 'string' || typeof resolved === 'number') {
    throw new Error(
      'HoverCard.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported'
    );
  }

  const child = resolved as any;

  const ctx = useHoverCardContext();
  const onMouseEnter = createEventHandler(child.props?.onMouseEnter, ctx.openDropdown);
  const onMouseLeave = createEventHandler(child.props?.onMouseLeave, ctx.closeDropdown);

  const eventListeners = { onMouseEnter, onMouseLeave };

  return (
    <Popover.Target {...others}>
      {(targetProps) => (
        <span {...eventListeners} {...targetProps}>
          {local.children}
        </span>
      )}
    </Popover.Target>
  );
}
HoverCardTarget.displayName = '@empoleon/core/HoverCardTarget';
