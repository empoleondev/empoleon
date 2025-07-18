import { useDisclosure } from '@empoleon/hooks';
import { ExtendComponent, Factory, useProps } from '../../core';
import { useDelayedHover } from '../Floating';
import { Popover, PopoverProps, PopoverStylesNames } from '../Popover';
import { PopoverCssVariables } from '../Popover/Popover';
import { HoverCardContextProvider } from './HoverCard.context';
import { HoverCardDropdown } from './HoverCardDropdown/HoverCardDropdown';
import { HoverCardTarget } from './HoverCardTarget/HoverCardTarget';
import { splitProps } from 'solid-js';

export interface HoverCardProps extends Omit<PopoverProps, 'opened' | 'onChange'> {
  variant?: string;

  /** Initial opened state */
  initiallyOpened?: boolean;

  /** Called when dropdown is opened */
  onOpen?: () => void;

  /** Called when dropdown is closed */
  onClose?: () => void;

  /** Open delay in ms */
  openDelay?: number;

  /** Close delay in ms */
  closeDelay?: number;
}

export type HoverCardFactory = Factory<{
  props: HoverCardProps;
  stylesNames: PopoverStylesNames;
  vars: PopoverCssVariables;
}>;

const defaultProps: Partial<HoverCardProps> = {
  openDelay: 0,
  closeDelay: 150,
  initiallyOpened: false,
};

export function HoverCard(_props: HoverCardProps) {
  const props = useProps('HoverCard', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'onOpen',
    'onClose',
    'openDelay',
    'closeDelay',
    'initiallyOpened'
  ]);
  const [opened, { open, close }] = useDisclosure(local.initiallyOpened, { onClose: local.onClose, onOpen: local.onOpen });
  const { openDropdown, closeDropdown } = useDelayedHover({ open, close, openDelay: local.openDelay, closeDelay: local.closeDelay });

  return (
    <HoverCardContextProvider value={{ openDropdown, closeDropdown }}>
      <Popover {...others} opened={opened()} keepMounted __staticSelector="HoverCard">
        {local.children}
      </Popover>
    </HoverCardContextProvider>
  );
}

HoverCard.displayName = '@empoleon/core/HoverCard';
HoverCard.Target = HoverCardTarget;
HoverCard.Dropdown = HoverCardDropdown;
HoverCard.extend = (input: ExtendComponent<HoverCardFactory>) => input;
