import { createMemo, JSX, splitProps } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  useProps,
} from '../../../core';
import { useListContext } from '../List.context';
import classes from '../List.module.css';

export type ListItemStylesNames = 'item' | 'itemWrapper' | 'itemIcon' | 'itemLabel';

export interface ListItemProps
  extends BoxProps,
    CompoundStylesApiProps<ListItemFactory>,
    ElementProps<'li'> {
  /** Icon to replace item bullet */
  icon?: () => JSX.Element;

  /** Item content */
  children?: JSX.Element;
}

export type ListItemFactory = Factory<{
  props: ListItemProps;
  ref: HTMLLIElement;
  stylesNames: ListItemStylesNames;
  compound: true;
}>;

export const ListItem = factory<ListItemFactory>((_props) => {
  const props = useProps('ListItem', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    'icon',
    'children',
    'mod',
    'ref',
  ]);

  const ctx = useListContext();

  const iconVal = () => local.icon ?? ctx.icon;
  const iconEl = createMemo<JSX.Element | null>(() => {
    const i = iconVal();
    return typeof i === 'function' ? (i as () => JSX.Element)() : (i ?? null);
  });

  const stylesApiProps = { classNames: local.classNames, styles: local.styles };

  return (
    <Box
      {...ctx.getStyles('item', {
        ...stylesApiProps,
        className: local.className,
        style: local.style,
      })}
      component="li"
      mod={[{ 'with-icon': !!iconEl(), centered: ctx.center }, local.mod]}
      ref={local.ref}
      {...others}
    >
      <Box component="div" {...ctx.getStyles('itemWrapper', stylesApiProps)}>
        {iconEl() && (
          <Box component="span" {...ctx.getStyles('itemIcon', stylesApiProps)}>
            {iconEl()}
          </Box>
        )}
        <Box component="span" {...ctx.getStyles('itemLabel', stylesApiProps)}>
          {local.children}
        </Box>
      </Box>
    </Box>
  );
});

ListItem.classes = classes;
ListItem.displayName = '@empoleon/core/ListItem';
