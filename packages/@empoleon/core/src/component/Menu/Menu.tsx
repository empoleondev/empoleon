import { createSignal, JSX, splitProps } from 'solid-js';
import { useUncontrolled } from '@empoleon/hooks';
import {
  ExtendComponent,
  Factory,
  getContextItemIndex,
  getWithProps,
  StylesApiProps,
  useProps,
  useResolvedStylesApi,
  useStyles,
} from '../../core';
import { useDelayedHover } from '../../utils/Floating';
import { __PopoverProps, Popover, PopoverStylesNames } from '../Popover';
import { MenuContextProvider } from './Menu.context';
import { MenuDivider } from './MenuDivider/MenuDivider';
import { MenuDropdown } from './MenuDropdown/MenuDropdown';
import { MenuItem } from './MenuItem/MenuItem';
import { MenuLabel } from './MenuLabel/MenuLabel';
import { MenuSub } from './MenuSub/MenuSub';
import { MenuTarget } from './MenuTarget/MenuTarget';
import classes from './Menu.module.css';

export type MenuStylesNames =
  | 'item'
  | 'itemLabel'
  | 'itemSection'
  | 'label'
  | 'divider'
  | 'chevron'
  | PopoverStylesNames;

export type MenuFactory = Factory<{
  props: MenuProps;
  stylesNames: MenuStylesNames;
}>;

export interface MenuProps extends __PopoverProps, StylesApiProps<MenuFactory> {
  variant?: string;

  /** Menu content */
  children?: JSX.Element;

  /** Controlled menu opened state */
  opened?: boolean;

  /** Uncontrolled menu initial opened state */
  defaultOpened?: boolean;

  /** Determines whether dropdown should trap focus of keyboard events */
  trapFocus?: boolean;

  /** Called when menu opened state changes */
  onChange?: (opened: boolean) => void;

  /** Called when Menu is opened */
  onOpen?: () => void;

  /** Called when Menu is closed */
  onClose?: () => void;

  /** Determines whether Menu should be closed when item is clicked */
  closeOnItemClick?: boolean;

  /** Determines whether arrow key presses should loop though items (first to last and last to first) */
  loop?: boolean;

  /** Determines whether dropdown should be closed when Escape key is pressed */
  closeOnEscape?: boolean;

  /** Event which should open menu */
  trigger?: 'click' | 'hover' | 'click-hover';

  /** Open delay in ms, applicable only to trigger="hover" variant */
  openDelay?: number;

  /** Close delay in ms, applicable only to trigger="hover" variant */
  closeDelay?: number;

  /** Determines whether dropdown should be closed on outside clicks */
  closeOnClickOutside?: boolean;

  /** Events that trigger outside clicks */
  clickOutsideEvents?: string[];

  /** Id base to create accessibility connections */
  id?: string;

  /** Set the `tabindex` on all menu items. Defaults to -1 */
  menuItemTabIndex?: -1 | 0;

  /** Determines whether focus placeholder element should be added before items, `true` by default */
  withInitialFocusPlaceholder?: boolean;
}

const defaultProps = {
  trapFocus: true,
  closeOnItemClick: true,
  withInitialFocusPlaceholder: true,
  clickOutsideEvents: ['mousedown', 'touchstart', 'keydown'],
  loop: true,
  trigger: 'click',
  openDelay: 0,
  closeDelay: 100,
  menuItemTabIndex: -1,
} satisfies Partial<MenuProps>;

export function Menu(_props: MenuProps) {
  const props = useProps('Menu', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'children',
    'onOpen',
    'onClose',
    'opened',
    'defaultOpened',
    'trapFocus',
    'onChange',
    'closeOnItemClick',
    'loop',
    'closeOnEscape',
    'trigger',
    'openDelay',
    'closeDelay',
    'classNames',
    'styles',
    'unstyled',
    'variant',
    'vars',
    'menuItemTabIndex',
    'keepMounted',
    'withInitialFocusPlaceholder',
    'attributes'
  ])

  const getStyles = useStyles<MenuFactory>({
    name: 'Menu',
    classes,
    props,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes
  });

  const [_opened, setOpened] = useUncontrolled({
    value: () => local.opened,
    defaultValue: local.defaultOpened!,
    finalValue: false,
    onChange: local.onChange,
  });
  const [openedViaClick, setOpenedViaClick] = createSignal(false);

  const close = () => {
    setOpened(false);
    setOpenedViaClick(false);
    _opened() && local.onClose?.();
  };

  const open = () => {
    setOpened(true);
    !_opened() && local.onOpen?.();
  };

  const toggleDropdown = () => {
    _opened() ? close() : open();
  };

  const { openDropdown, closeDropdown } = useDelayedHover({ open, close, closeDelay: local.closeDelay, openDelay: local.openDelay });

  const getItemIndex = (node: HTMLButtonElement) =>
    getContextItemIndex('[data-menu-item]', '[data-menu-dropdown]', node);

  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi<MenuFactory>({
    classNames: local.classNames,
    styles: local.styles,
    props,
  });

  return (
    <MenuContextProvider
      value={{
        getStyles,
        opened: _opened(),
        toggleDropdown,
        getItemIndex,
        openedViaClick: openedViaClick(),
        setOpenedViaClick,
        closeOnItemClick: local.closeOnItemClick,
        closeDropdown: local.trigger === 'click' ? close : closeDropdown,
        openDropdown: local.trigger === 'click' ? open : openDropdown,
        closeDropdownImmediately: close,
        loop: local.loop,
        trigger: local.trigger,
        unstyled: local.unstyled,
        menuItemTabIndex: local.menuItemTabIndex,
        withInitialFocusPlaceholder: local.withInitialFocusPlaceholder,
      }}
    >
      <Popover
        {...others}
        opened={_opened()}
        onChange={toggleDropdown}
        defaultOpened={local.defaultOpened}
        trapFocus={local.keepMounted ? false : local.trapFocus}
        closeOnEscape={local.closeOnEscape}
        __staticSelector="Menu"
        classNames={resolvedClassNames}
        styles={resolvedStyles}
        unstyled={local.unstyled}
        variant={local.variant}
        keepMounted={local.keepMounted}
      >
        {local.children}
      </Popover>
    </MenuContextProvider>
  );
}

Menu.extend = (input: ExtendComponent<MenuFactory>) => input;
Menu.withProps = getWithProps<MenuProps, MenuProps>(Menu as any);
Menu.classes = classes as Record<string, string>;
Menu.displayName = '@empoleon/core/Menu';
Menu.Item = MenuItem;
Menu.Label = MenuLabel;
Menu.Dropdown = MenuDropdown;
Menu.Target = MenuTarget;
Menu.Divider = MenuDivider;
Menu.Sub = MenuSub;
