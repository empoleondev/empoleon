import { splitProps, JSX } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  getSpacing,
  EmpoleonSpacing,
  StylesApiProps,
  useProps,
  useStyles,
} from '../../core';
import { filterFalsyChildren } from './filter-falsy-children/filter-falsy-children';
import classes from './Group.module.css';

export type GroupStylesNames = 'root';
export type GroupCssVariables = {
  root:
    | '--group-gap'
    | '--group-align'
    | '--group-justify'
    | '--group-wrap'
    | '--group-child-width';
};

export interface GroupStylesCtx {
  childWidth: string;
}

export interface GroupProps extends BoxProps, StylesApiProps<GroupFactory>, ElementProps<'div'> {
  __size?: any;

  /** Controls `justify-content` CSS property, `'flex-start'` by default */
  justify?: JSX.CSSProperties['justify-content'];

  /** Controls `align-items` CSS property, `'center'` by default */
  align?: JSX.CSSProperties['align-items'];

  /** Controls `flex-wrap` CSS property, `'wrap'` by default */
  wrap?: JSX.CSSProperties['flex-wrap'];

  /** Key of `theme.spacing` or any valid CSS value for `gap`, numbers are converted to rem, `'md'` by default */
  gap?: EmpoleonSpacing;

  /** Determines whether each child element should have `flex-grow: 1` style, `false` by default */
  grow?: boolean;

  /** Determines whether children should take only dedicated amount of space (`max-width` style is set based on the number of children), `true` by default */
  preventGrowOverflow?: boolean;
}

export type GroupFactory = Factory<{
  props: GroupProps;
  ref: HTMLDivElement;
  stylesNames: GroupStylesNames;
  vars: GroupCssVariables;
  ctx: GroupStylesCtx;
}>;

const defaultProps: Partial<GroupProps> = {
  preventGrowOverflow: true,
  gap: 'md',
  align: 'center',
  justify: 'flex-start',
  wrap: 'wrap',
};

const varsResolver = createVarsResolver<GroupFactory>(
  (_, props, props2) => ({
    root: {
      '--group-child-width': props.grow && props.preventGrowOverflow ? props2.childWidth : undefined,
      '--group-gap': getSpacing(props.gap),
      '--group-align': props.align,
      '--group-justify': props.justify,
      '--group-wrap': props.wrap,
    },
  })
);

export const Group = factory<GroupFactory>(_props => {
  const props = useProps('Group', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'children',
    'gap',
    'align',
    'justify',
    'wrap',
    'grow',
    'preventGrowOverflow',
    'vars',
    'variant',
    '__size',
    'mod',
    'attributes',
    'ref',
  ]);

  const filteredChildren = () => filterFalsyChildren(local.children);
  const childrenCount = () => filteredChildren.length;
  const resolvedGap = getSpacing(local.gap ?? 'md');
  const childWidth = () => `calc(${
    100 / childrenCount()
  }% - (${resolvedGap} - ${resolvedGap} / ${childrenCount}))`;

  const stylesCtx: GroupStylesCtx = { childWidth: childWidth() };

  const getStyles = useStyles<GroupFactory>({
    name: 'Group',
    props,
    stylesCtx,
    className: local.className,
    style: local.style,
    classes,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  return (
    <Box
      {...getStyles('root')}
      ref={local.ref}
      variant={local.variant}
      mod={[{ grow: local.grow }, local.mod]}
      size={local.__size}
      {...others}
    >
      {filteredChildren()}
    </Box>
  );
});

Group.classes = classes;
Group.displayName = '@empoleon/core/Group';
