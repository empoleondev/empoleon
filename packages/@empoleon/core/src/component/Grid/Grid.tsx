import { splitProps, JSX, createMemo } from 'solid-js';
import {
  Box,
  BoxProps,
  createVarsResolver,
  ElementProps,
  factory,
  Factory,
  EmpoleonSpacing,
  StyleProp,
  StylesApiProps,
  useProps,
  useRandomClassName,
  useStyles,
} from '../../core';
import { GridBreakpoints, GridProvider } from './Grid.context';
import { GridCol } from './GridCol/GridCol';
import { GridVariables } from './GridVariables';
import classes from './Grid.module.css';
import { createStore } from 'solid-js/store';

export type GridStylesNames = 'root' | 'col' | 'inner' | 'container';
export type GridCssVariables = {
  root: '--grid-justify' | '--grid-align' | '--grid-overflow';
};

export interface GridProps extends BoxProps, StylesApiProps<GridFactory>, ElementProps<'div'> {
  /** Gutter between columns, key of `theme.spacing` or any valid CSS value, `'md'` by default */
  gutter?: StyleProp<EmpoleonSpacing>;

  /** Determines whether columns in the last row should expand to fill all available space, `false` by default */
  grow?: boolean;

  /** Sets `justify-content`, `flex-start` by default */
  justify?: JSX.CSSProperties['justify-content'];

  /** Sets `align-items`, `stretch` by default */
  align?: JSX.CSSProperties['align-items'];

  /** Number of columns in each row, `12` by default */
  columns?: number;

  /** Sets `overflow` CSS property on the root element, `'visible'` by default */
  overflow?: JSX.CSSProperties['overflow'];

  /** Determines typeof of queries that are used for responsive styles, `'media'` by default */
  type?: 'media' | 'container';

  /** Breakpoints values, only applicable when `type="container"` is set, ignored when `type` is not set or `type="media"` is set. */
  breakpoints?: GridBreakpoints;
}

export type GridFactory = Factory<{
  props: GridProps;
  ref: HTMLDivElement;
  stylesNames: GridStylesNames;
  vars: GridCssVariables;
  staticComponents: {
    Col: typeof GridCol;
  };
}>;

const defaultProps: Partial<GridProps> = {
  gutter: 'md',
  grow: false,
  columns: 12,
};

const varsResolver = createVarsResolver<GridFactory>((_, props) => ({
  root: {
    '--grid-justify': props.justify,
    '--grid-align': props.align,
    '--grid-overflow': props.overflow,
  },
}));

export const Grid = factory<GridFactory>(_props => {
  const props = useProps('Grid', defaultProps, _props);
  const [local, others] = splitProps(props, [
    'classNames',
    'className',
    'style',
    'styles',
    'unstyled',
    'vars',
    'grow',
    'gutter',
    'columns',
    'align',
    'justify',
    'children',
    'breakpoints',
    'type',
    'attributes',
    'ref'
  ]);

  const getStyles = useStyles<GridFactory>({
    name: 'Grid',
    classes,
    props,
    className: local.className,
    style: local.style,
    classNames: local.classNames,
    styles: local.styles,
    unstyled: local.unstyled,
    attributes: local.attributes,
    vars: local.vars,
    varsResolver,
  });

  const [contextValue] = createStore({
    getStyles,
    get grow() { return local.grow; },
    get columns() { return local.columns || 12; },
    get breakpoints() { return local.breakpoints; },
    get type() { return local.type; }
  });

  const responsiveClassName = useRandomClassName();

  if (local.type === 'container' && local.breakpoints) {
    return (
      <GridProvider value={contextValue}>
        <GridVariables selector={`.${responsiveClassName}`} {...local} />
        <Box component='div' {...getStyles('container')}>
          <Box ref={local.ref} {...getStyles('root', { className: responsiveClassName })} {...others}>
            <Box component='div' {...getStyles('inner')}>{local.children}</Box>
          </Box>
        </Box>
      </GridProvider>
    );
  }

  return (
    <GridProvider value={contextValue}>
      <GridVariables selector={`.${responsiveClassName}`} {...props} />
      <Box ref={local.ref} {...getStyles('root', { className: responsiveClassName })} {...others}>
        <Box component='div' {...getStyles('inner')}>{local.children}</Box>
      </Box>
    </GridProvider>
  );
});

Grid.classes = classes;
Grid.displayName = '@empoleon/core/Grid';
Grid.Col = GridCol;
