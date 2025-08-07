import { JSX, splitProps } from 'solid-js';
import { useMergedRef } from '@empoleon/hooks';
import {
  BoxProps,
  CompoundStylesApiProps,
  createEventHandler,
  createScopedKeydownHandler,
  EmpoleonColor,
  parseThemeColor,
  polymorphicFactory,
  PolymorphicFactory,
  useDirection,
  useEmpoleonTheme,
  useProps,
} from '../../../core';
import { UnstyledButton } from '../../UnstyledButton';
import { useMenuContext } from '../Menu.context';
import { useSubMenuContext } from '../MenuSub/MenuSub.context';
import classes from '../Menu.module.css';

export type MenuItemStylesNames = 'item' | 'itemLabel' | 'itemSection';

export interface MenuItemProps extends BoxProps, CompoundStylesApiProps<MenuItemFactory> {
  'data-disabled'?: boolean;

  /** Item label */
  children?: JSX.Element;

  /** Key of `theme.colors` or any valid CSS color */
  color?: EmpoleonColor;

  /** Determines whether the menu should be closed when the item is clicked, overrides `closeOnItemClick` prop on the `Menu` component */
  closeMenuOnClick?: boolean;

  /** Section displayed on the left side of the label */
  leftSection?: JSX.Element;

  /** Section displayed on the right side of the label */
  rightSection?: JSX.Element;

  /** Disables item */
  disabled?: boolean;
}

export type MenuItemFactory = PolymorphicFactory<{
  props: MenuItemProps;
  defaultRef: HTMLButtonElement;
  defaultComponent: 'button';
  stylesNames: MenuItemStylesNames;
  compound: true;
}>;

const defaultProps: Partial<MenuItemProps> = {};

export const MenuItem = polymorphicFactory<MenuItemFactory>(_props => {
  const props = useProps('MenuItem', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'color',
    'closeMenuOnClick',
    'leftSection',
    'rightSection',
    'children',
    'disabled',
    'ref',
    'data-disabled',
  ]);

  const ctx = useMenuContext();
  const subCtx = useSubMenuContext();
  const theme = useEmpoleonTheme();
  const { dir } = useDirection();
  let itemRef: HTMLButtonElement | undefined;
  const _others: any = others;

  const handleClick = createEventHandler(_others.onClick, () => {
    if (local['data-disabled']) {
      return;
    }
    if (typeof local.closeMenuOnClick === 'boolean') {
      local.closeMenuOnClick && ctx.closeDropdownImmediately();
    } else {
      ctx.closeOnItemClick && ctx.closeDropdownImmediately();
    }
  });

  const colors = local.color ? theme.variantColorResolver({ color: local.color, theme, variant: 'light' }) : undefined;
  const parsedThemeColor = local.color ? parseThemeColor({ color: local.color, theme }) : null;

  const handleKeydown = createEventHandler<any>(_others.onKeyDown, (event: any) => {
    if (event.key === 'ArrowLeft' && subCtx) {
      subCtx.close();
      subCtx.focusParentItem();
    }
  });

  return (
    <UnstyledButton
      onMouseDown={(event) => event.preventDefault()}
      {...others}
      unstyled={ctx.unstyled}
      tabIndex={ctx.menuItemTabIndex}
      {...ctx.getStyles('item', { className: local.className, style: local.style, styles: local.styles, classNames: local.classNames })}
      ref={useMergedRef(itemRef, local.ref)}
      role="menuitem"
      disabled={local.disabled}
      data-menu-item
      data-disabled={local.disabled || local['data-disabled'] || undefined}
      data-empoleon-stop-propagation
      onClick={handleClick}
      onKeyDown={createScopedKeydownHandler({
        siblingSelector: '[data-menu-item]:not([data-disabled])',
        parentSelector: '[data-menu-dropdown]',
        activateOnFocus: false,
        loop: ctx.loop,
        dir,
        orientation: 'vertical',
        onKeyDown: handleKeydown,
      })}
      __vars={{
        '--menu-item-color':
          parsedThemeColor?.isThemeColor && parsedThemeColor?.shade === undefined
            ? `var(--empoleon-color-${parsedThemeColor.color}-6)`
            : colors?.color,
        '--menu-item-hover': colors?.hover,
      }}
    >
      {local.leftSection && (
        <div {...ctx.getStyles('itemSection', { styles: local.styles, classNames: local.classNames })} data-position="left">
          {local.leftSection}
        </div>
      )}
      {local.children && <div {...ctx.getStyles('itemLabel', { styles: local.styles, classNames: local.classNames })}>{local.children}</div>}
      {local.rightSection && (
        <div {...ctx.getStyles('itemSection', { styles: local.styles, classNames: local.classNames })} data-position="right">
          {local.rightSection}
        </div>
      )}
    </UnstyledButton>
  );
});

MenuItem.classes = classes;
MenuItem.displayName = '@empoleon/core/MenuItem';
