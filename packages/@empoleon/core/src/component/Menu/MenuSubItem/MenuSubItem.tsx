import { JSX, splitProps } from 'solid-js';
import { useMergedRef } from '@empoleon/hooks';
import {
  Box,
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
import { AccordionChevron } from '../../Accordion';
import { UnstyledButton } from '../../UnstyledButton';
import { useMenuContext } from '../Menu.context';
import { useSubMenuContext } from '../MenuSub/MenuSub.context';
import classes from '../Menu.module.css';

export type MenuSubItemStylesNames = 'item' | 'itemLabel' | 'itemSection';

export interface MenuSubItemProps extends BoxProps, CompoundStylesApiProps<MenuSubItemFactory> {
  'data-disabled'?: boolean;

  /** Item label */
  children?: JSX.Element;

  /** Key of `theme.colors` or any valid CSS color */
  color?: EmpoleonColor;

  /** Section displayed on the left side of the label */
  leftSection?: JSX.Element;

  /** Section displayed on the right side of the label */
  rightSection?: JSX.Element;

  /** Disables item */
  disabled?: boolean;

  /** Determines whether the menu should be closed when the item is clicked, `false` by default */
  closeMenuOnClick?: boolean;
}

export type MenuSubItemFactory = PolymorphicFactory<{
  props: MenuSubItemProps;
  defaultRef: HTMLButtonElement;
  defaultComponent: 'button';
  stylesNames: MenuSubItemStylesNames;
  compound: true;
}>;

export const MenuSubItem = polymorphicFactory<MenuSubItemFactory>((_props) => {
  const props = useProps('MenuSubItem', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'color',
    'leftSection',
    'rightSection',
    'children',
    'disabled',
    'data-disabled',
    'closeMenuOnClick',
    'ref',
  ]);

  const dataDisabled = local['data-disabled'];

  const ctx = useMenuContext();
  const subCtx = useSubMenuContext();
  const theme = useEmpoleonTheme();
  const { dir } = useDirection();
  const itemRef: HTMLButtonElement | null = null;
  const _others: any = others;

  const colors = local.color
    ? theme.variantColorResolver({ color: local.color, theme, variant: 'light' })
    : undefined;
  const parsedThemeColor = local.color ? parseThemeColor({ color: local.color, theme }) : null;

  const handleKeydown = createEventHandler<any>(_others.onKeyDown, (event: any) => {
    if (event.key === 'ArrowRight') {
      subCtx?.open();
      subCtx?.focusFirstItem();
    }

    if (event.key === 'ArrowLeft' && subCtx?.parentContext) {
      subCtx.parentContext.close();
      subCtx.parentContext.focusParentItem();
    }
  });

  const handleClick = createEventHandler(_others.onClick, () => {
    if (!dataDisabled && local.closeMenuOnClick) {
      ctx.closeDropdownImmediately();
    }
  });

  const handleMouseEnter = createEventHandler(_others.onMouseEnter, subCtx?.open);
  const handleMouseLeave = createEventHandler(_others.onMouseLeave, subCtx?.close);

  return (
    <UnstyledButton
      onMouseDown={(event) => event.preventDefault()}
      {...others}
      unstyled={ctx.unstyled}
      tabIndex={ctx.menuItemTabIndex}
      {...ctx.getStyles('item', {
        className: local.className,
        style: local.style,
        styles: local.styles,
        classNames: local.classNames,
      })}
      ref={useMergedRef(itemRef, local.ref)}
      role="menuitem"
      disabled={local.disabled}
      data-menu-item
      data-sub-menu-item
      data-disabled={local.disabled || dataDisabled || undefined}
      data-empoleon-stop-propagation
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
        <Box
          component="div"
          {...ctx.getStyles('itemSection', { styles: local.styles, classNames: local.classNames })}
          data-position="left"
        >
          {local.leftSection}
        </Box>
      )}

      {local.children && (
        <Box
          component="div"
          {...ctx.getStyles('itemLabel', { styles: local.styles, classNames: local.classNames })}
        >
          {local.children}
        </Box>
      )}

      <Box
        component="div"
        {...ctx.getStyles('itemSection', { styles: local.styles, classNames: local.classNames })}
        data-position="right"
      >
        {/* @ts-ignore */}
        {local.rightSection || <AccordionChevron {...ctx.getStyles('chevron')} size={14} />}
      </Box>
    </UnstyledButton>
  );
});

MenuSubItem.classes = classes;
MenuSubItem.displayName = '@empoleon/core/MenuSubItem';
