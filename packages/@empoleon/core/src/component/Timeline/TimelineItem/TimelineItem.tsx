import { splitProps, JSX, onMount, createSignal, useContext, createEffect } from 'solid-js';
import {
  Box,
  BoxProps,
  CompoundStylesApiProps,
  ElementProps,
  factory,
  Factory,
  getRadius,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  useEmpoleonTheme,
  useProps,
} from '../../../core';
import { useTimelineContext } from '../Timeline.context';
import classes from '../Timeline.module.css';

export type TimelineItemStylesNames =
  | 'itemBody'
  | 'itemContent'
  | 'itemBullet'
  | 'item'
  | 'itemTitle';

export interface TimelineItemProps
  extends BoxProps,
    CompoundStylesApiProps<TimelineItemFactory>,
    ElementProps<'div', 'title'> {
  /** Determines whether the item should be highlighted, controlled by the parent `Timeline` component  */
  __active?: boolean;

  /** Determines whether the line of the item should be highlighted, controlled by the parent Timeline component */
  __lineActive?: boolean;

  /** Line and bullet position relative to item content, controlled by the parent Timeline component */
  __align?: 'right' | 'left';

  /** Item title, displayed next to the bullet */
  title?: JSX.Element;

  /** Content displayed below the title */
  children?: JSX.Element;

  /** React node that should be rendered inside the bullet – icon, image, avatar, etc. By default, large white dot is displayed. */
  bullet?: JSX.Element;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `'xl'` by default */
  radius?: EmpoleonRadius;

  /** Key of `theme.colors` or any valid CSS color to control active item colors, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Controls line border style, `'solid'` by default */
  lineVariant?: 'solid' | 'dashed' | 'dotted';
}

export type TimelineItemFactory = Factory<{
  props: TimelineItemProps;
  ref: HTMLDivElement;
  stylesNames: TimelineItemStylesNames;
  compound: true;
}>;

export const TimelineItem = factory<TimelineItemFactory>(_props => {
  const props = useProps('TimelineItem', null, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'vars',
    '__active',
    '__align',
    '__lineActive',
    '__vars',
    'bullet',
    'radius',
    'color',
    'lineVariant',
    'children',
    'title',
    'mod',
    'ref'
  ]);

  const ctx = useTimelineContext();
  const theme = useEmpoleonTheme();

  const stylesApiProps = { classNames: local.classNames, styles: local.styles };

  const [idx, setIdx] = createSignal<number>(-1);
  onMount(() => {
    setIdx(ctx.registerItem());
  });

  const isActive = () => {
    const activeIdx = () => ctx.activeIndex();
    return ctx.reverseActive()
      ? activeIdx() >= ctx.totalItems() - idx() - 1
      : activeIdx() >= idx();
  };

  const isLineActive = () => {
    const activeIdx = () => ctx.activeIndex();
    return ctx.reverseActive()
      ? activeIdx() >= ctx.totalItems() - idx() - 1
      : activeIdx() - 1 >= idx();
  };

  return (
    <Box
      {...ctx.getStyles('item', { ...stylesApiProps, className: local.className, style: local.style })}
      mod={[{ "line-active": isLineActive(), active: isActive() }, local.mod]}
      ref={local.ref}
      __vars={{
        '--tli-radius': local.radius ? getRadius(local.radius) : undefined,
        '--tli-color': local.color ? getThemeColor(local.color, theme) : undefined,
        '--tli-border-style': local.lineVariant || undefined,
      }}
      {...others}
    >
      <Box
        {...ctx.getStyles('itemBullet', stylesApiProps)}
        mod={{ 'with-child': !!local.bullet, 'align': ctx.align(), 'active': isActive() }}
      >
        {local.bullet}
      </Box>

      <Box component='div' {...ctx.getStyles('itemBody', stylesApiProps)}>
        {local.title && <Box component='div' {...ctx.getStyles('itemTitle', stylesApiProps)}>{local.title}</Box>}
        <Box component='div' {...ctx.getStyles('itemContent', stylesApiProps)}>{local.children}</Box>
      </Box>
    </Box>
  );
});

TimelineItem.classes = classes;
TimelineItem.displayName = '@empoleon/core/TimelineItem';
