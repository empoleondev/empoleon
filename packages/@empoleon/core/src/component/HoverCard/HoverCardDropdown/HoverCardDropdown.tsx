import { JSX, splitProps } from 'solid-js';
import { createEventHandler, useProps } from '../../../core';
import { Popover, PopoverDropdownProps } from '../../Popover';
import { useHoverCardContext } from '../HoverCard.context';

export interface HoverCardDropdownProps extends PopoverDropdownProps {
  /** Dropdown content */
  children?: JSX.Element;
}

// keep your defaults object
const defaultProps: Partial<HoverCardDropdownProps> = {};

export function HoverCardDropdown(_props: HoverCardDropdownProps) {
  const props = useProps('HoverCardDropdown', defaultProps, _props);

  const [local, others] = splitProps(props, [
    'onMouseEnter',
    'onMouseLeave',
    'children',
  ]);

  const ctx = useHoverCardContext();

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

