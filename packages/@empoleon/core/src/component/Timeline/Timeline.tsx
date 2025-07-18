import { splitProps, JSX, createSignal } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getAutoContrastValue,
  getContrastColor,
  getRadius,
  getThemeColor,
  EmpoleonColor,
  EmpoleonRadius,
  rem,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { TimelineItem, TimelineItemStylesNames } from './TimelineItem/TimelineItem';
import { TimelineProvider } from './Timeline.context';
import classes from './Timeline.module.css';

export type TimelineStylesNames = 'root' | TimelineItemStylesNames;
export type TimelineCssVariables = {
  root: '--tl-line-width' | '--tl-bullet-size' | '--tl-color' | '--tl-icon-color' | '--tl-radius';
};

export interface TimelineProps
  extends BoxProps,
    StylesApiProps<TimelineFactory>,
    ElementProps<'div'> {
  /** `Timeline.Item` components */
  children?: JSX.Element;

  /** Index of active element */
  active?: number;

  /** Key of `theme.colors` or any valid CSS color to control active item colors, `theme.primaryColor` by default */
  color?: EmpoleonColor;

  /** Key of `theme.radius` or any valid CSS value to set `border-radius`, numbers are converted to rem, `'xl'` by default */
  radius?: EmpoleonRadius;

  /** Controls size of the bullet, `20` by default */
  bulletSize?: number | string;

  /** Controls how the content is positioned relative to the bullet, `'left'` by default */
  align?: 'right' | 'left';

  /** Control width of the line */
  lineWidth?: number | string;

  /** Determines whether the active items direction should be reversed without reversing items order, `false` by default */
  reverseActive?: boolean;

  /** Determines whether icon color should depend on `background-color`. If luminosity of the `color` prop is less than `theme.luminosityThreshold`, then `theme.white` will be used for text color, otherwise `theme.black`. Overrides `theme.autoContrast`. */
  autoContrast?: boolean;
}

export type TimelineFactory = Factory<{
  props: TimelineProps;
  ref: HTMLDivElement;
  stylesNames: TimelineStylesNames;
  vars: TimelineCssVariables;
  staticComponents: {
    Item: typeof TimelineItem;
  };
}>;

const defaultProps: Partial<TimelineProps> = {
  active: -1,
  align: 'left',
  reverseActive: false,
};

const varsResolver = createVarsResolver<TimelineFactory>(
  (theme, { bulletSize, lineWidth, radius, color, autoContrast }) => ({
    root: {
      '--tl-bullet-size': rem(bulletSize),
      '--tl-line-width': rem(lineWidth),
      '--tl-radius': radius === undefined ? undefined : getRadius(radius),
      '--tl-color': color ? getThemeColor(color, theme) : undefined,
      '--tl-icon-color': getAutoContrastValue(autoContrast, theme)
        ? getContrastColor({ color, theme, autoContrast })
        : undefined,
    },
  })
);

export const Timeline = factory<TimelineFactory>(_props => {
  const props = useProps('Timeline', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'children',
    'active',
    'color',
    'radius',
    'bulletSize',
    'align',
    'lineWidth',
    'reverseActive',
    'mod',
    'autoContrast',
    'ref'
  ]);

  const getStyles = useStyles<TimelineFactory>({
    name: 'Timeline',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    vars: local.vars,
    varsResolver,
  });

  const [count, setCount] = createSignal(0);

  const registerItem = () => {
    const idx = count();
    setCount(idx + 1);
    return idx;
  };

  return (
    <TimelineProvider value={{
      getStyles,
      registerItem,
      activeIndex: () => local.active!,
      reverseActive: () => local.reverseActive!,
      align: () => local.align!,
      unstyled: () => !!local.unstyled,
    }}>
      <Box {...getStyles('root')} mod={[{ align: local.align }, local.mod]} ref={local.ref} {...others}>
        {local.children}
      </Box>
    </TimelineProvider>
  );
});

Timeline.classes = classes;
Timeline.displayName = '@empoleon/core/Timeline';
Timeline.Item = TimelineItem;
