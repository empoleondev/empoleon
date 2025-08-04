import { JSX, splitProps } from 'solid-js';
import { createEventHandler, useProps } from '../../../core';
import { Popover, PopoverDropdownProps } from '../../Popover';
import { useHoverCardContext } from '../HoverCard.context';
import { useHoverCardGroupContext } from '../HoverCardGroup/HoverCardGroup.context';

export interface HoverCardDropdownProps extends PopoverDropdownProps {
  /** Dropdown content */
  children?: JSX.Element;
}

export function HoverCardDropdown(_props: HoverCardDropdownProps) {
  const props = useProps('HoverCardDropdown', null, _props);

  const [local, others] = splitProps(props, [
    'onMouseEnter',
    'onMouseLeave',
    'children',
  ]);

  const ctx = useHoverCardContext();
  const withinGroup = useHoverCardGroupContext();

  if (withinGroup && ctx.getFloatingProps && ctx.floating) {
    const floatingProps = ctx.getFloatingProps();

    return (
      <Popover.Dropdown
        ref={ctx.floating}
        {...floatingProps}
        onMouseEnter={createEventHandler<any>(local.onMouseEnter, floatingProps.onMouseEnter)}
        onMouseLeave={createEventHandler<any>(local.onMouseLeave, floatingProps.onMouseLeave)}
        {...others}
      >
        {local.children}
      </Popover.Dropdown>
    );
  }

  const handleMouseEnter = createEventHandler<any>((local.onMouseEnter as any), ctx.openDropdown);
  const handleMouseLeave = createEventHandler<any>((local.onMouseLeave as any), ctx.closeDropdown);

  return (
    <Popover.Dropdown
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...others}
    >
      {local.children}
    </Popover.Dropdown>
  );
}

HoverCardDropdown.displayName = '@empoleon/core/HoverCardDropdown';

