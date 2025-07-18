import { JSX, splitProps } from 'solid-js';
import { createEventHandler, isElement, useProps } from '../../../core';
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

  const ctx = useHoverCardContext();

  const onMouseEnter = createEventHandler((local.children as any)?.props?.onMouseEnter, ctx.openDropdown);
  const onMouseLeave = createEventHandler((local.children as any)?.props?.onMouseLeave, ctx.closeDropdown);

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
